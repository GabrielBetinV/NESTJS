import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,

    // Inyectamos el repositorio
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    // Limpiamos las tablas
    await this.deleteTables();

    // Eliminar todos los datos
    await this.productsService.deleteAllProducts();

    // Insertar los nuevos datos


    // Insert de los usuarios
    const adminUser = await this.insertUsers();

    // Insert de los productos
    await this.insertNewProducts(adminUser);

    return true;
  }

  // Creamos una funcion para borrar las tablas
  private async deleteTables() {
    await this.productsService.deleteAllProducts();

    // Borramos la tabla de los usuarios
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  // Funcion para insertar usuarios
  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];
  }

  private async insertNewProducts(user:User) {
    // Obtengo los datos
    const products = initialData.products;

    // Tendremos un arreglo de promesas
    const insertPromise = [];

    // Recorremos los productos y lo insertamos
    products.forEach((product) => {
      insertPromise.push(this.productsService.create(product, user));
    });

    // Obtenemos  el arreglo, despues que termine de ejecutarse la promesa
    await Promise.all(insertPromise);
  }
}
