import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Response,
} from '@nestjs/common';
import { AuthToken } from 'common/decorator/validate.token';
import { ADMIN } from 'common/role';
// import { IFProduct } from 'entity/product/product';
// import { IFProductIMG } from 'entity/product/productIMG';
import { Response as ExpressResponse } from 'express';
import {
  IFCreactProduct,
  ProductService,
} from 'src/product/service/product/product.service';
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listProduct(
    @Response() res: ExpressResponse,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const { totalPages, products } = await this.productService.findProduct(
      page || 1,
      limit || 12,
    );
    return res.status(200).json({
      status: 200,
      message: 'Request successfully',
      page,
      limit,
      totalPages,
      value: products,
    });
  }

  @Post()
  async addProduct(
    @Response() res: ExpressResponse,
    // @AuthToken([ADMIN]) userInfo: any,
    @Body() products: IFCreactProduct,
  ) {
    const value = await this.productService.createProduct(products);
    return res.status(200).json({
      status: 200,
      message: 'Request successfully',
      product: value,
    });
  }

  @Get('detail/:id')
  async productDetail(
    @Response() res: ExpressResponse,
    @Param('id') id: number,
  ) {
    const product = await this.productService.findProductDetail(id);
    return res.status(200).json({
      status: 200,
      message: 'Request successfully',
      product,
    });
  }
}
