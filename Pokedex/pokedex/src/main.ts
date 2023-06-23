import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // De esta manera podemos colocar un prefijo para las api
  // Se consumiria asi http://localhost:3000/api/v2/pokemon
  app.setGlobalPrefix('api/v2');


  // Para trabajar con los pipes de class validatir
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
    );


  await app.listen(3000);
}
bootstrap();
