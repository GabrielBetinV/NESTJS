import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // De esta manera podemos colocar un prefijo para las api
  // Se consumiria asi http://localhost:3000/api/v2/pokemon
  app.setGlobalPrefix('api/v2');


  await app.listen(3000);
}
bootstrap();
