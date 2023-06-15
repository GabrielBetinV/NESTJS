import { IsString, MinLength } from "class-validator";


export class CreateCarDto {

  @IsString()
  readonly brand: string;

  @IsString()
  //@MinLength(3) // Esto configura la propuiedad para que solo reciba 3 caracteres
  readonly model: string;
}
