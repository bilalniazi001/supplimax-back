import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ✅ SIMPLIFIED CORS CONFIGURATION - WORKING
  app.enableCors({
    origin: [
      'http://localhost:3000',  // Local development
      'https://gymberista.vercel.app',  // Your Vercel frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  
  // ❌ COMMENT OUT THIS LINE TEMPORARILY (REMOVE GLOBAL PREFIX)
  // app.setGlobalPrefix('api');
  
  const port = process.env.PORT || 8080; // ✅ CHANGE 5000 TO 8080
  
  // ✅ 0.0.0.0 for Railway
  await app.listen(port, '0.0.0.0');
  
  console.log(`✅ Server running on http://0.0.0.0:${port}`);
  console.log(`🔗 Frontend URL: https://gymberista.vercel.app`);
  console.log('🔍 NODE_ENV:', process.env.NODE_ENV || 'development');
}
bootstrap();