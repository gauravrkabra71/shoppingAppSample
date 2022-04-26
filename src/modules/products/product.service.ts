import { ProductRepository } from './product.repository';
import { ProductData } from './types';

export class ProductService {
  private readonly productRepo: ProductRepository;

  constructor() {
    this.productRepo = new ProductRepository();
  }

  async createProduct(data: ProductData): Promise<ProductData> {
    return this.productRepo.createProduct(data);
  }

  async getProduct(productId: string): Promise<ProductData> {
    const product = await this.productRepo.getProductById(productId);

    if (!product) {
      throw new Error('product not found');
    }

    return product;
  }

  async getProducts() {
    return this.productRepo.getProducts();
  }

  async updateProduct(
    productId: string,
    data: Partial<ProductData>,
  ): Promise<boolean> {
    return this.productRepo.updateProduct(productId, data);
  }
}
