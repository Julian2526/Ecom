import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    await this.orderModel.create(createOrderDto);
    return { message: 'Pedido guardado en MongoDB' };
  }

  findByUser(email: string) {
    return this.orderModel.find({ 'user.email': email }).sort({ createdAt: -1 });
  }

  findAll() {
    return this.orderModel.find().sort({ createdAt: -1 });
  }
}
