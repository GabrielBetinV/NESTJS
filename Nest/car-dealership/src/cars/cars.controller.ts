import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto , UpdateCarDto} from './dto'; // Importamos los DTO desde el index de dto


// Cuando busquemos en en  http://localhost:3000/cars se mostrara lo que tengamos dentro de la clase
@Controller('cars') 
//@UsePipes( ValidationPipe) // => Pipe a nivel global de controlador, es mejor colocarlo a nivel global de aplicacion en el main
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

  // Agregamos el Pipe ParseUUIDPipe que nos ayuda a validarlos UUID
  // Hay varias versiones de UUID, se puede colcoar el ppipe indicando la version
  @Get(':id')
  getCarByID(@Param('id', ParseUUIDPipe) id: string) {
    console.log({ id });

    // De esta manera obtendremos el carro de acuerdo a la posicion
    return this.carsService.findOneById(id);
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

  // Cambiamos las formas de tener los ID con UUID
  // Se debe cambiar el tipo de dato a string en
  // todas las funciones que reciban y retornen ID

  // POST

  // Se debe crear un DTO => Data Transfer Object y no es más que 
  //un objeto que se transfiere por la red entre dos sistemas
  // Creamos el DTO para Cars ccreate-car.dto.ts

  // Agregamos el DTO como tipo de dato para el Body
  // Ahora que tenemos el DTO podriamos agregar el validatePipe
  // HAy 4 lugares en donde se pueden colocar ppies (Anivel de parametros@params,
  // A nivel del controlador o un metodo del controlador,  a nivel global de aplicacion
  // o a nivel global de controlador)

  // Con UsePipes le decimos al post que utilice el validationPIpe pero necesitamos instalar
  // class-validator u class-transformer
  // yarn add class-validator class-transformer

  // Importar el class-validator en el DTO y colocar el tipo de validacion


  @Post()
  //@UsePipes( ValidationPipe) ?=> Es mejor colocarlo  a nivel de controlador ver arriba
  createCar(@Body() createCarDto: CreateCarDto) {

    // Vamos a crear el carro, enviamos el objeto al servicio para crear el nuevo carro
    return this.carsService.create(createCarDto);
  }

    // PATCH => No vamos a utiliza el ParseIntPipe porque el uuid es string.
    // utilizaremos el  ParseUUIDPipe
    // Creamos un DTO para actualizar UpdateCarDto
  @Patch(':id')
  updateCar(@Param('id',ParseUUIDPipe ) id:string,
  @Body() updateCarDto: UpdateCarDto ) {
      
      return updateCarDto;

    // // De esta manera obtendremos el carro de acuerdo a la posicion
    // return this.carsService.findOneById(id);
  }


  // DELETE
  @Delete(':id')
  deleteCar(@Param('id') id: string) {
    console.log({ id });

    // De esta manera obtendremos el carro de acuerdo a la posicion
    return this.carsService.findOneById(id);
  }
  

  // // PATCH
  // @Patch(':id')
  // updateCar(@Param('id', ParseIntPipe) id: Number) {
  //   console.log({ id });

  //   // De esta manera obtendremos el carro de acuerdo a la posicion
  //   return this.carsService.findOneById(+id);
  // }


  // // DELETE
  // @Delete(':id')
  // deleteCar(@Param('id', ParseIntPipe) id: Number) {
  //   console.log({ id });

  //   // De esta manera obtendremos el carro de acuerdo a la posicion
  //   return this.carsService.findOneById(+id);
  // }
}
