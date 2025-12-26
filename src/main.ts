import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CORS Setup (Iske baghair frontend connect nahi hoga)
  app.enableCors({
    origin: [
      'http://localhost:3000', // Local development ke liye
      'https://gymberista.vercel.app', // Jo aapka Next.js ka Vercel URL hy
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 2. Global Prefix (Agar aap fetch mn /products se pehle /api likhna chahte hain)
  // app.setGlobalPrefix('api'); 

  // 3. Port Configuration (Vercel/Production ke liye dynamic port zaroori hy)
  const port = process.env.PORT || 5000;
  await app.listen(port);
  
  console.log(`🚀 Backend is running on: http://localhost:${port}`);
}
bootstrap();