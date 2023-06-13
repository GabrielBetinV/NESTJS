import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

// Cuando busquemos en en  http://localhost:3000/cars se mostrara lo que tengamos dentro de la clase
@Controller('cars')
export class CarsController {
  // Aca colocaremos lo que queremos mostrar, es decir las peticiones

  // Ahora, vamos a crear un array y se almacena en una propiedad de la clase  para obtnerlos
  // vehiculos segun su posicion
  //   private cars: string[] = ['Toyota', 'Honda', 'Jeep']; => Esto la pasaremos al servicio

  // Aca inyectaremos el servicio
  constructor(private readonly carsService: CarsService) {}

  // Metodos utilizando el servicio

  //   @Get(':id')
  //   getCarByID(@Param('id') id: String) {
  //     // console.log({id: +id}) => De esta manera podriamos convertir en number un string
  //     console.log({ id });

  //     // De esta manera obtendremos el carro de acuerdo a la posicion
  //     return this.cars[+id];
  //   }

  // Devuelve todo los carros
  @Get()
  getAllCars() {
    return this.carsService.finAll();
  }

  // Pipes => Transformar la data recibida en requests, para
  //asegurar un tipo, valor o instancia de un objeto.
  //Ej: Transformar a números, validaciones, etc.

  // Pipes integrados en Nests
  // ValidationPipe
  // ParseIntPipe
  // ParseFloatPipe
  // ParseBoolPipe
  // ParseArrayPipe
  // ParseUUIDPipe
  // ParseEnumPipe
  // DefaultValuePipe
  // ParseFilePipe

  //  Documentacion => https://docs.nestjs.com/pipes

  // Utilizando un Pipes para que convierta el id en entero => ParseiIntPipe
  // Ahora desde el fronentd o cliente, si manda un string va a recibir un error en 400
  @Get(':id')
  getCarByID(@Param('id', ParseIntPipe) id: Number) {
    console.log({ id });

    // De esta manera obtendremos el carro de acuerdo a la posicion
    return this.carsService.findOneById(+id);
  }

  // Status del HTTP =>  https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

  // Informational responses (100 – 199)
  // Successful responses (200 – 299)
  // Redirection messages (300 – 399)
  // Client error responses (400 – 499)
  // Server error responses (500 – 599)

  // Metodo para devolver un carro desde el id con el servicio
  // @Get(':id')
  // getCarByID(@Param('id') id: String) {
  //   // console.log({id: +id}) => De esta manera podriamos convertir en number un string
  //   console.log({ id });

  //   // De esta manera obtendremos el carro de acuerdo a la posicion
  //   return this.carsService.findOneById(+id);
  // }

  //   // Devuelve todo los carros
  //   @Get()
  //   getAllCars() {
  //     return this.cars;
  //   }

  // Por ejemplo este Get, devolvera un arreglo de vehiculos
  //   @Get()
  //   getAllCars() {
  //     return ['Toyota', 'Honda', 'Jeep'];
  //   }

  // TERMINAR EL CRUD DE CARS

  // POST
  @Post()
  createCar(@Body() body: any) {
    return body;
  }
  

  // PATCH
  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: Number) {
    console.log({ id });

    // De esta manera obtendremos el carro de acuerdo a la posicion
    return this.carsService.findOneById(+id);
  }


  // DELETE
  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: Number) {
    console.log({ id });

    // De esta manera obtendremos el carro de acuerdo a la posicion
    return this.carsService.findOneById(+id);
  }
}
