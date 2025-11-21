// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return { 
      message: 'Supplimax Backend is running on port 5000!',
      status: 'OK'
    };
  }
}