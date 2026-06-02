import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>
  ) {}

  async findAll() {
    return this.productModel.find();
  }

  async create(data: any) {
    return this.productModel.create(data);
  }

  async findOne(id: string) {
    return this.productModel.findById(id);
  }
}