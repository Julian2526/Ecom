import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  // 🆕 imagen del producto
  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);