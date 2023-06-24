import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  // Inyectar en el contructor el provider de mongoose para crear el modelo
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    // Busqueda pornumero => Validar si es un numero y realizar la busqueda
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // Buscar por el MongoID si no encontro en la busqueda anterior
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Si no se ha encontrado con las opciones anterior, buscamos por el nombre
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }

    // Lanzamos una exception si el pokemon no se encuentra
    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" nto found`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    // Buscamos si existe el pokemon reutilizando el metodo de busqueda anterior
    const pokemon = await this.findOne(term);

    // Si con la busqueda anterior encuentra el pokemon pasara a este metodo

    // Pasamos el nombre en minuscula
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }

    try {
      //grabar en base de datos
      await pokemon.updateOne(updatePokemonDto, { new: true });

      // Sobre escribo el pokemon con el objeto que recibimos en el body, ya que seguramente paso
      // Todas las validaciones anterior
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    
      const pokemon = this.findOne(id);
      (await pokemon).deleteOne();


      // Se podria hacer todo en una linea
      //this.pokemonModel.findByIdAndRemove(id);

    
    return `This action removes a #${id} pokemon`;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      // Lanzamos un error que indica cual valor o campos estan duplicado
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );
    } else {
      throw new InternalServerErrorException(
        `Cant't create Pokemon - Check server logs`,
      );
    }
  }
}
