import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  
  @Get()
  getHello() {
    return { 
      message: 'Supplimax Backend API',
      status: 'OK',
      timestamp: new Date().toISOString(),
      endpoints: {
        products: '/products',
        featured: '/products/featured/all',
        categories: '/products/categories/all',
        health: '/health'
      }
    };
  }

  // app.controller.ts mein add karein
@Get('products')
getTestProducts() {
  return {
    message: 'Test products (temporary)',
    data: [
      { id: 1, name: 'Test Product 1', price: 100, category: 'Protein' },
      { id: 2, name: 'Test Product 2', price: 200, category: 'Pre Workout' },
    ]
  };
}

  @Get('health')
  healthCheck() {
    return {
      status: 'healthy',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    };
  }
}