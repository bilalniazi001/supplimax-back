// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS Setup (Production ke liye allow all)
  app.enableCors({
    origin: [
      'http://localhost:3000', // Local frontend
      'https://gymberista.vercel.app', // Your frontend
      'https://supplimax.vercel.app', // Any other domains
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Optional: Global prefix
  // app.setGlobalPrefix('api');

  const port = process.env.PORT || 5000;
  await app.listen(port);
  
  console.log(`🚀 Backend running on port ${port}`);
  console.log(`📡 API Endpoint: http://localhost:${port}`);
}

bootstrap();