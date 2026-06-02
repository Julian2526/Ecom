import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true, collection: 'orders' })
export class Order {
  @Prop({ type: Object, required: true })
  user: Record<string, unknown>;

  @Prop({ type: Array, required: true, default: [] })
  cart: Record<string, unknown>[];

  @Prop({ required: true, min: 0 })
  total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
