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

  async findProduct(page: number, limit: number) {
    const totalRecords = await this.productRepository.count();
    const totalPages = Math.ceil(totalRecords / limit);

    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.photos', 'photos')
      .skip((page - 1) * limit) // Bỏ qua các bản ghi ban đầu
      .take(limit) // Giới hạn số lượng bản ghi trả về
      .getMany();

    return { totalPages, products };
  }

  async findProductDetail(id: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.photos', 'photos')
      .where('product.product_id = :id', { id })
      .getOne();
    return product;
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
