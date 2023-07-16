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

import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { ProductImage, Product } from './entities';
import { Delete, Query } from '@nestjs/common';

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

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    // Inyectamos el Datasource, que conoce la cadena de conexion
    private readonly dataSource: DataSource,
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

      // Operador rest para almacenar el arreglo de imagenes en un nuava variable
      const { images = [], ...producDetails } = createProductDto;

      /// De esta manera se guardan los dos repository
      const product = this.productRepository.create({
        ...producDetails,
        images: images.map((image) =>
          this.productImageRepository.create({ url: image }),
        ),
      });

      // Grabamos el producto en la base de datos
      await this.productRepository.save(product);

      // Retornamos el producto
      return { ...product, images };
    } catch (error) {
      this.handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      },
    });

    return products.map((product) => ({
      ...product,
      images: product.images.map((img) => img.url),
    }));
  }

  async findOne(term: string) {
    //const product =  await this.productRepository.findOneBy({id});

    let product: Product;

    if (isUUID(term)) {
      // Asi podemos buscar un prodcuto con el idy su relacion
      //product = await this.productRepository.findOne({ where: {id: term}, relations: {images:true} });

      // Pero mejor lo hacemos asi, con egers => https://orkhan.gitbook.io/typeorm/docs/eager-and-lazy-relations
      // Solo se agrega el eger en el product.entity
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      // product = await this.productRepository.findOneBy({slug: term})

      // Utilizar el Query Builder
      // const queryBuilder = this.productRepository.createQueryBuilder();
      // product = await queryBuilder
      //   .where(`UPPER(title) =:title or slug =:slug`, {
      //     title: term.toLocaleUpperCase(),
      //     slug: term.toLocaleLowerCase(),
      //   })
      //   .getOne();

      // para la busca con el slug, utilizaremos el leftjoinAndSelect
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where(`UPPER(title) =:title or slug =:slug`, {
          title: term.toLocaleUpperCase(),
          slug: term.toLocaleLowerCase(),
        })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }

    if (!product)
      throw new NotFoundException(`Product whit id ${term} not found`);

    return product;
  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: images.map((image) => image.url),
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    // Estraer los datos del objeto sin las imagenes, el rest (Que es la data que va a actualizar)
    const { images, ...toUpdate } = updateProductDto;

    // Hacemos el preload del producto
    const product = await this.productRepository.preload({
      id,
      ...toUpdate,
    });

    // Buscamos el objeto por el ID con el preload y hacemos el spread
    // Al objeto encontrado
    // const product = await this.productRepository.preload({
    //   id: id,
    //   ...updateProductDto,
    //   images: [],
    // });

    if (!product)
      throw new NotFoundException(`Product whit id: ${id} not found`);

    // Crear el Query Runner
    const queryRunner = this.dataSource.createQueryRunner();

    // Nos conectamos a la base de datos
    await queryRunner.connect();

    // Iniciamos la transaccion
    await queryRunner.startTransaction();

    try {
      // Eliminamos las imagenes anteriores
      if (images) {
        // Eliminamos con el query runner, indicamos el id para eliminar
        await queryRunner.manager.delete(ProductImage, { product: { id } });

        // Guardar las nuevas imagenes, hasta este momento no se a inpactado la base de datos
        product.images = images.map((image) =>
          this.productImageRepository.create({ url: image }),
        );
      } else {
        //???????? si no se reciben imagenes, buscamos las imagenes
        // Esto se hace mejor utilizando
        product.images = await this.productImageRepository.findBy({product: {id}});
      }

      //  Guardar el producto, pero aun no se ha echo commits
      await queryRunner.manager.save(product);

      // Si encuentra el producto lo actualiza
      //await this.productRepository.save(product);

      // Aca realizamos el commit
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);
     // return product;
    } catch (error) {

      //Aca realizamos el rollback de la transaccion
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDbExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }


async deleteAllProducts(){
  const query = this.productRepository.createQueryBuilder('product');

  try {
    
    return await query
    .delete()
    .where({})
    .execute()

  } catch (error) {
    this.handleDbExceptions(error);
    
  }


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
