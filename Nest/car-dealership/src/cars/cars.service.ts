import { Injectable } from '@nestjs/common';

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

  // Metodo para devolver un carro
  findOneById(id: number) {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }
}
