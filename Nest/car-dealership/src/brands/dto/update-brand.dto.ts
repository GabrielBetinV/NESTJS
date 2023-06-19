import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsString, MinLength } from 'class-validator';

// export class UpdateBrandDto extends PartialType(CreateBrandDto) {


// De esta manera no estariamos reutilizando lo que el CLI nos creao al momento de este
// DTO, el de arriba
export class UpdateBrandDto  {
  // El este DTO solo colocaremos el nombre con la condicion
  // De que sea string y tenga por lo menos un digito
  // En el update, indicamos que debe ser de este DTO
  @IsString()
  @MinLength(1)
  name: string;
}
