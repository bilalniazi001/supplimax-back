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

  @Get('health')
  healthCheck() {
    return {
      status: 'healthy',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    };
  }
}