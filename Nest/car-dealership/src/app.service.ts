// import { Injectable } from '@nestjs/common';


// Alojan la lógica de negocio de tal manera que sea
// reutilizable mediante inyección de dependencias.
// Ej: PeliculasService para todo lo relacionado a obtener,
// grabar, actualizar o eliminar información de películas.

// https://docs.nestjs.com/providers#services

// Hay dos conceptos

//1. Providers : Son clases que se pueden inyectar, no todos los providers
// tienen logica de negocios, se utiliza mas que todoas para inyectar dependencias

// NO todos los providers son servicios

//2. Services

// Todos los servicios son providers
// Los servicios se utilizan para trabajar con la logica del negocio
// nest g s => Para crear los servicios
// Crearemos un servicio => nest g s cars
// Actualizara el cars.module



// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World - Gabo!';
//   }
// }
