import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors({
    origin: 'http://localhost:80',
    credentials: true,
    exposedHeaders: 'Set-Cookie'
  })

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
  
}
bootstrap();

