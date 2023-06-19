import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRAND_SEED } from './data/brands.seed';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class SeedService {

// Creamos el constructor para inyectar los servicios de cars y brands
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService
  ){}

  //Metodo que retornara o hara las veces de los datos almacenados en la base de datoss
  populateDB() {
   

    // Asi pódemos llamar cada SEED y Retornarlos de  forma independiente
     //return BRAND_SEED;

     //return CARS_SEED;

      //this.carsService.fillCarsWithSeedData(CARS_SEED);
      this.brandsService.fillCarsWithSeedData(BRAND_SEED);
      
      return 'SEED Execute';
  }
}
