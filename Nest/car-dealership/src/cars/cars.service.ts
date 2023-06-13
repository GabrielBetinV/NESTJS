import { Injectable, NotFoundException } from '@nestjs/common';

// Estos se puede inyectar
@Injectable()
export class CarsService {
  // Este objeto es el que vamos a enviar como respuesta del servicio

  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: 3,
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  // Metodos para devolver los carros
  finAll() {
    return this.cars;
  }


  // Exception Filters => https://docs.nestjs.com/exception-filters
    // Maneja los errores de código en mensajes de
    // respuesta http. Usualmente Nest ya incluye todos los
    // casos de uso comunes, pero se pueden expandir
    // basado en las necesidades.

    // BadRequestException
    // UnauthorizedException
    // NotFoundException
    // ForbiddenException
    // NotAcceptableException
    // RequestTimeoutException
    // ConflictException
    // GoneException
    // HttpVersionNotSupportedException
    // PayloadTooLargeException
    // UnsupportedMediaTypeException
    // UnprocessableEntityException
    // InternalServerErrorException
    // NotImplementedException
    // ImATeapotException
    // MethodNotAllowedException
    // BadGatewayException
    // ServiceUnavailableException
    // GatewayTimeoutException
    // PreconditionFailedException


    // Ejemplos de lanzar exeptions filters
    findOneById(id: number) {

      const car = this.cars.find((car) => car.id === id);


      // PErsonalizando el mensaje del NotFoundException
      if( !car) throw new NotFoundException(`Car whit id ${id} not found`);
       

      // retorna un message Not found Exception
      // if( !car){
      //   throw new NotFoundException();
      // }  

      return car;
    }
  



  // Metodo para devolver un carro
  // findOneById(id: number) {

  //   const car = this.cars.find((car) => car.id === id);

  //   return car;
  // }

  // // Metodo para devolver un carro usando el servicio
  // findOneById(id: number) {
  //   const car = this.cars.find((car) => car.id === id);

  //   return car;
  // }
}
