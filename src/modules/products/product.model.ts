import { Schema, model } from 'mongoose';
import { ProductDoc } from './types';

const ProductSchema = new Schema<ProductDoc>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    inventory: { type: Number, required: false, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = model<ProductDoc>('product', ProductSchema);
