// api/index.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import  express from 'express';
import  serverless from 'serverless-http';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new (require('@nestjs/platform-express')).ExpressAdapter(expressApp)
  );

  // ✅ CORS - ALLOW EVERYTHING
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.init();
}

// Initialize the app
bootstrap();

// Export for Vercel
module.exports = serverless(expressApp);