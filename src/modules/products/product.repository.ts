import { startSession } from 'mongoose';
import { UpdateProductRequestDto } from './dtos/updateProductRequest.dto';
import { ProductModel } from './product.model';
import { ProductData, ProductDoc } from './types';

export class ProductRepository {
  private toProductData(productDocument: ProductDoc): ProductData {
    return productDocument.toObject({
      getters: true,
      versionKey: false,
      transform: (_doc, response) => {
        const { _id, createdAt, updatedAt, ...result } = response;
        return result;
      },
    });
  }

  async createProduct(productData: ProductData): Promise<ProductData> {
    return this.toProductData(await ProductModel.create(productData));
  }

  async getProductById(productId: string): Promise<ProductData | null> {
    const product = await ProductModel.findById(productId).exec();

    if (product) {
      return this.toProductData(product);
    }

    return null;
  }

  async getProducts() {
    const products = (await ProductModel.find({})) || [];
    return products.map(this.toProductData);
  }

  async updateProduct(
    productId: string,
    data: UpdateProductRequestDto,
  ): Promise<boolean> {
    await ProductModel.updateOne({ _id: productId }, data).exec();
    return true;
  }
}
