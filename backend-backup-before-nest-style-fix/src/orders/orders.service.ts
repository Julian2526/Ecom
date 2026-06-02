import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>
  ) {}

  async create(order: any) {
    const newOrder = new this.orderModel(order);
    await newOrder.save();
    return { message: 'Pedido guardado en MongoDB' };
  }

  // 🔥 ORDENADOS DEL MÁS NUEVO AL MÁS VIEJO
  async findByUser(email: string) {
    return this.orderModel
      .find({ 'user.email': email })
      .sort({ createdAt: -1 }); // 👈 CLAVE
  }

  // (opcional) todos los pedidos
  async findAll() {
    return this.orderModel
      .find()
      .sort({ createdAt: -1 });
  }
}