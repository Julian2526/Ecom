import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un pedido' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Pedido guardado.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los pedidos' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':email')
  @ApiOperation({ summary: 'Listar pedidos por email de usuario' })
  @ApiParam({ name: 'email', description: 'Email del usuario' })
  findByUser(@Param('email') email: string) {
    return this.ordersService.findByUser(email);
  }
}
