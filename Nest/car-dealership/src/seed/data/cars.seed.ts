import { Car } from 'src/cars/interfaces/car.interface';
import { v4 as uuid } from 'uuid';



// Esta constante tendra las datas de los carros
export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Corolla',
  },
  {
    id: uuid(),
    brand: 'Honda',
    model: 'Civic',
  },
  {
    id: uuid(),
    brand: 'Jeep',
    model: 'Cherokee',
  },
];
