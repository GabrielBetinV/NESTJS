import { IsString, MinLength } from 'class-validator';

export class CreateBrandDto {


  // El este DTO solo colocaremos el nombre con la condicion
  // De que sea string y tenga por lo menos un digito
  // En el pos, indicamos que debe ser de este DTO
  @IsString()
  @MinLength(1)
  name: string;
}
