import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import { SeedModule } from './seed/seed.module';

// Los modulos Agrupan y desacoplan un conjunto de funcionalidad
// específica por dominio.
// Ej: auth.module.ts, encargado de todo lo relacionado a
// la autenticación => https://docs.nestjs.com/modules

// app.module.ts => Es el modulo principal, se referenciaran otros modulos
// Controladores, servicios etc

// nest g mo  => Para crear modulos, crearemos nuestro primer modulo
// nest g mo cars, esto actualizara la importacion del modulo en el  app Module

@Module({
  imports: [CarsModule, BrandsModule, SeedModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
