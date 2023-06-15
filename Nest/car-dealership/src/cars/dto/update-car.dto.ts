import { IsString, MinLength ,IsUUID, IsOptional} from "class-validator";


export class UpdateCarDto {

  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsOptional()
  //@MinLength(3) // Esto configura la propuiedad para que solo reciba 3 caracteres
  readonly model?: string;
}
