import { Controller, Get, Param } from '@nestjs/common';
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




  // Metodo para devolver un carro desde el id con el
  @Get(':id')
  getCarByID(@Param('id') id: String) {
    // console.log({id: +id}) => De esta manera podriamos convertir en number un string
    console.log({ id });

    // De esta manera obtendremos el carro de acuerdo a la posicion
    return this.carsService.findOneById(+id);
  }

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
}
