import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS Setup
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Get port from Railway or use default
  const port = process.env.PORT || 5000;
  
  console.log('🚀 Starting server on port:', port);
  
  await app.listen(port);
  
  console.log(`✅ Server running on port ${port}`);
}

bootstrap();