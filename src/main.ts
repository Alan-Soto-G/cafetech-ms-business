import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const host = process.env.HOST ?? '192.168.40.5';
  const port = Number(process.env.PORT ?? 3000);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, host);
  console.log(`App running on http://${host}:${port}`);
}
bootstrap();