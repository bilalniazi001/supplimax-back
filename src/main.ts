import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// main.ts - ADD 0.0.0.0
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({ origin: '*' });
  
  const port = process.env.PORT || 5000;
  
  // IMPORTANT: Add 0.0.0.0 for Railway
  await app.listen(port, '0.0.0.0');
  
  console.log(`✅ Server running on port ${port}`);
}
bootstrap();