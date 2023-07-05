import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  // instanciamos el Logger de nest common para mostrar los errores
  // Recibe la clase de donde quiero el logger
  private readonly logger = new Logger('ProductsService');

  // Patron repositorio de  type ORm
  constructor(
    // Inyectamos el repositorio que recibe un Product y es de tipo Product
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {

        // // Validamos si viene el campó slug para autocompletarlo
        // if(!createProductDto.slug){
        //   createProductDto.slug = createProductDto.title
        //     .toLocaleLowerCase()
        //     .replaceAll(' ', '_')
        //     .replaceAll("'", ' ')
        // }else{
        //   createProductDto.slug = createProductDto.slug
        //   .toLocaleLowerCase()
        //   .replaceAll(' ', '_')
        //   .replaceAll("'", ' ')

        // }


      // Crear instancia del producto
      const product = this.productRepository.create(createProductDto);

      // Grabamos el producto en la base de datos
      await this.productRepository.save(product);

      // Retornamos el producto
      return product;
    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }


  private handleDbExceptions(error: any) {
    // Especificamos un error
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server error!',
    );
  }
}
