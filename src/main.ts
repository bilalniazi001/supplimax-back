import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,
});

  await app.listen(5000);
  console.log('🚀 Backend running on http://localhost:5000');
}
bootstrap();