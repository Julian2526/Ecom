import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module'; // 👈 NUEVO
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot( 'mongodb://admin:1234@ac-bip51lj-shard-00-00.7jfphpa.mongodb.net:27017,ac-bip51lj-shard-00-01.7jfphpa.mongodb.net:27017,ac-bip51lj-shard-00-02.7jfphpa.mongodb.net:27017/Cafe?ssl=true&replicaSet=atlas-m7jd99-shard-0&authSource=admin&retryWrites=true&w=majority'),
    ProductsModule,
    UsersModule,
    OrdersModule, //  AGREGADO AQUÍ
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}