import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
    IsPositive, IsString, MinLength 
} from 'class-validator';


export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number; 

    // Indicamos que es un arreglo de string
    @IsString({ each: true })
    @IsArray()
    sizes: string[]

    // Que este dentro de estos valores configurados
    @IsIn(['men','women','kid','unisex'])
    gender: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];


}
