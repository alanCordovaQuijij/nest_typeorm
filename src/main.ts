import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //no permite que pasen campos que no esten en el dto,
    transform: true
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
