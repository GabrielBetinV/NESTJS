import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// El main es el punto de entrada de la aplicacion
// Tiene una funcion llamada bootstrap, se puede cambiar ael nombre  main si queremos

async function main() {

  // Este metodo crea la aplicacion, se manda el modulo principal
  const app = await NestFactory.create(AppModule);

  // Puerto en donde inicia la aplicacion
  await app.listen(3000);
}
main();




// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();
