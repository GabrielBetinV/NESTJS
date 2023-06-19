import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  // Creamos un arreglo de brands del tipo de la entidad
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime(),
    // },
  ];

  // Para el metodo POS
  create(createBrandDto: CreateBrandDto) {
    // Destructuramos el objeto para obtener el name
    const { name } = createBrandDto;

    // Inicializamos el objeto de tikpo Brand para almacenmarlo en la base de datos o el arreglo
    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };

    // Agregamos el objeto al arreglo
    this.brands.push(brand);

    // retornamos todos los objetos
    return this.findAll();
  }

  // Retornaremos todos los brands
  findAll() {
    return this.brands;
  }

  // Metodo para encontrar un brand con el id
  findOne(id: string) {
    //Consultar el brands con el id
    const brand = this.brands.find((brand) => brand.id === id);

    // Valido si existe el brands
    if (!brand) throw new NotFoundException(`Brand whith id "${id}" not found`);

    // Si no hay error, retornamos el brands
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    // Consultamos el brands con el id y se almacena en la variable
    let brandDB = this.findOne(id);

    // Funcion para consultar el brands con el id y validar si es el que vamos a actualizar
    this.brands = this.brands.map((brand) => {
      // Si el id es el mismo
      if (brand.id === id) {
        // Almacenamos la fecha de actualkizacion
        brandDB.updateAt = new Date().getTime();

        // Actualizamos el objeto con el spread

        brandDB = { ...brandDB, ...updateBrandDto };

        //Retornamos el objeto actualizado
        return brandDB;
      }

      // retornamos el brand que encontro en la funcion this.brand.............map
      // Este no esta actializado
      return brand;
    });

    return this.brands;
  }

  // Metodo para eliminar
  remove(id: string) {
    // Filtramos en el objeto los brands con el id diferente al que estamos recibiendo
    this.brands = this.brands.filter((brands) => brands.id !== id);

    // Retiornamos el arreglo filtrado
    return this.brands;
  }

  // Este metodo recibe el arreglo y lo convierte en el brands
  // Del servicio para obtener todos los metodos del servicio
  fillCarsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
