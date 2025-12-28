async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ YEHI LINE CHANGE KARO (EXACT):
  app.enableCors({
    origin: '*', // Sabko allow karo
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 5000;
  await app.listen(port);
  
  console.log(`🚀 Backend is running on: http://localhost:${port}`);
}
bootstrap();