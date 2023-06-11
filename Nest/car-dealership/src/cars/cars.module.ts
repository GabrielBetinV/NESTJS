import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';


// Crear el controlador para el modulo de cars
//  Esto importara el controlador en el cars module 
//  controllers: [CarsController]


@Module({
  controllers: [CarsController],
  providers: [CarsService]
})

export class CarsModule {}
