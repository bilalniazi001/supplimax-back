import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './products/auth/auth.module';
import { UsersModule } from './products/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/supplimax-db'), 
    ProductsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}