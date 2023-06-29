import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {

    // Eliminamos todos los datos de la BD pára que no guarde registros duplicados
    await this.pokemonModel.deleteMany({});


    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1000',
    );

    // Array que tendra almacenada las promesas
    const pokemonToInsert: {name:string, no:number}[] = [];

    //Recorremos la data para obtener  el nombre y la url
    data.results.forEach(async ({ name, url }) => {
      // Realizamos un split a la URL y obtendremos la posicion en donde se encuentra el no del Pokemon
      const segments = url.split('/');
      console.log(segments);
      const no: number = +segments[segments.length - 2];

      //const pokemon = await this.pokemonModel.create({name,no})


      // Almacenamos las promesas en el array
      pokemonToInsert.push({ name, no });
    });

    // Ejecutamos la promesa para que se creen los datos
    const newArray = await this.pokemonModel.insertMany(pokemonToInsert);

    return {...newArray};
  }
}
