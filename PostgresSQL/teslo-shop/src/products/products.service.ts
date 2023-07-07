import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';


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

  findAll(paginationDto: PaginationDto) {

    const {limit = 10 , offset=0} = paginationDto;

    return this.productRepository.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(term: string) {

   //const product =  await this.productRepository.findOneBy({id}); 
   
   let product: Product;
 
   if( isUUID(term)){
    product = await this.productRepository.findOneBy({id: term})
   }else{
    // product = await this.productRepository.findOneBy({slug: term})

    // Utilizar el Query Builder
    const queryBuilder = this.productRepository.createQueryBuilder();
    product = await queryBuilder
      .where(`UPPER(title) =:title or slug =:slug`, {
        title: term.toLocaleUpperCase(),
        slug: term.toLocaleLowerCase()
      }).getOne();
   }

   
   if(!product)
      throw new NotFoundException(`Product whit id ${term} not found`);
   
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {

    const product = await this.findOne(id);
    await this.productRepository.remove(product);
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
