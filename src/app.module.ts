// src/app.module.ts - UPDATED VERSION
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    // Config Module
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // MongoDB Connection - SIMPLE AND FIXED
    MongooseModule.forRoot(process.env.DATABASE_URL || 'mongodb://localhost:27017/supplimax', {
      retryAttempts: 3,
      retryDelay: 1000,
    }),
    
    // Your modules
    ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}