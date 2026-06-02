import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Order {
  @Prop({ type: Object })
  user: any;

  @Prop({ type: Array })
  cart: any[];

  @Prop()
  total: number;

  // 🆕 FECHA AUTOMÁTICA
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);