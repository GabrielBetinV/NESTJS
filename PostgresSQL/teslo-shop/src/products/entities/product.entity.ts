import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'products'})
export class Product {

  @ApiProperty({
    example: '0f8fc0a2-70ed-4789-a94e-eb879cac9b1e',
    description: 'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product Price'
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example: 'lorem ssdsdaj ujasauunasd  unasdasd',
    description: 'Product Description',
    default: null
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 'T_Shirt_Teslo',
    description: 'Product SLUG -for SEO',
    uniqueItems: true
  })
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product Stock',
    default: 0
  })
  @Column('int', {
    default: 0,
  })
  stock: number;

  @ApiProperty({
    example: ['M','XL', 'XXL'],
    description: 'Product Sizes'
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty({
    example: 'women',
    description: 'Product Gender'
  })
  @Column('text')
  gender: string;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: []
  })
  tags: string[];

  @ApiProperty()
  @OneToMany(
      () => ProductImage,
      (productImage) => productImage.product,
      {cascade: true, eager: true}
  )
  images?: ProductImage[];


  @ManyToOne(
    () => User,
    (user) => user.product,
    {eager: true}
  )
  user: User;



  @BeforeInsert()
  checkSlugInsert() {
    // Validamos si viene el campó slug para autocompletarlo
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
