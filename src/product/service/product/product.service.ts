import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'entity/product/category';
import { IFProduct, Product } from 'entity/product/product';
import { IFProductIMG, ProductIMG } from 'entity/product/productIMG';
import { Repository } from 'typeorm';

export interface IFCreactProduct {
  product: IFProduct;
  images: IFProductIMG[];
}
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductIMG)
    private ProductIMGRepository: Repository<ProductIMG>,
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  async createProduct(data: IFCreactProduct) {
    const product = await this.productRepository.save(
      mapProducts(data.product),
    );
    const image = await this.ProductIMGRepository.save(
      mapImages(data.images, product.product_id),
    );
    const response = { product, image };
    return response;
  }

  async findProduct() {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.photos', 'photos')
      .getMany();
  }
}

// map
const mapImages = (images: IFProductIMG[], product_id: number) => {
  return images.map(
    (image) =>
      ({
        product_id,
        url: image.url,
      } as IFProductIMG),
  );
};
const mapProducts = (pr: IFProduct): IFProduct => ({
  category_id: pr.category_id,
  name: pr.name,
  price: pr.price,
  quantity: pr.quantity,
  describe: pr.describe,
  overview: pr.overview,
  isActive: pr.isActive,
});
