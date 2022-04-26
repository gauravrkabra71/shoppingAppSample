import {
  Body,
  Controller,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Route,
  Tags,
} from 'tsoa';
import { UpdateProductRequestDto } from './dtos/updateProductRequest.dto';
import { ProductService } from './product.service';
import { ProductData } from './types';

const BASE_PATH = 'products';

@Route('products')
@Tags('products')
export class ProductController extends Controller {
  private readonly productService: ProductService;

  constructor() {
    super();
    this.productService = new ProductService();
  }

  @Post()
  async createProduct(@Body() payload: ProductData): Promise<ProductData> {
    return this.productService.createProduct(payload);
  }

  @Get()
  async getProducts(): Promise<ProductData[]> {
    return this.productService.getProducts();
  }

  @Get('{productId}')
  async getProduct(@Path('productId') productId: string): Promise<ProductData> {
    return this.productService.getProduct(productId);
  }

  @Patch('{productId}')
  async updateProduct(
    @Path('productId') productId: string,
    @Body() payload: UpdateProductRequestDto,
  ): Promise<boolean> {
    return this.productService.updateProduct(productId, payload);
  }
}
