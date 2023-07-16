import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService
  ){

  }


  async runSeed(){


    // Eliminar todos los datos
    await this.productsService.deleteAllProducts();


    // Insertar los nuevos datos
    
    // Obtengo los datos 
    const products = initialData.products;


    // Tendremos un arreglo de promesas
    const insertPromise = [];

    // Recorremos los productos y lo insertamos
    products.forEach( product => {
      insertPromise.push(this.productsService.create(product));
    });

    // Obtenemos  el arreglo, despues que termine de ejecutarse la promesa
    await Promise.all(insertPromise);

    return true;    
  }
}
