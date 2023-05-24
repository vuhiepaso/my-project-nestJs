import { Module } from '@nestjs/common';
import { ProductController } from './controller/product/product.controller';
import { ProductService } from './service/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'entity/product/product';
import { ProductIMG } from 'entity/product/productIMG';
import { Category } from 'entity/product/category';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductIMG, Category])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
