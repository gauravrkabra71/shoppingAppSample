import { Document } from 'mongoose';
import { ProductData } from './product.data';

export type ProductDoc = Document & ProductData;
