import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ✅ PROPER CORS CONFIGURATION
  app.enableCors({
    origin: [
      'http://localhost:3000',  // Local development
      'https://gymberista.vercel.app',  // Your Vercel frontend
      'https://*.vercel.app', // Alternative
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Requested-With',
      'Origin',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods'
    ],
    exposedHeaders: [
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials'
    ],
    credentials: true,  // ✅ Important for cookies/tokens
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  
  // ✅ Global prefix for all routes (optional)
  app.setGlobalPrefix('api');
  
  const port = process.env.PORT || 5000;
  
  // ✅ 0.0.0.0 for Railway
  await app.listen(port, '0.0.0.0');
  
  console.log(`✅ Server running on http://0.0.0.0:${port}`);
  console.log(`🔗 API Base URL: https://supplimax-back-production.up.railway.app`);
  console.log('🔍 DATABASE_URL:', process.env.MONGODB_URL ? 'Set' : 'Not set');
  console.log('🔍 NODE_ENV:', process.env.NODE_ENV || 'development');
}
bootstrap();