import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: { email: 'cliente@example.com' } })
  @IsObject()
  user: Record<string, unknown>;

  @ApiProperty({ example: [{ _id: '...', name: 'Cafe', price: 25000, quantity: 1 }] })
  @IsArray()
  cart: Record<string, unknown>[];

  @ApiProperty({ example: 25000 })
  @IsNumber()
  @Min(0)
  total: number;
}
