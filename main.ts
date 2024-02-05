import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from './src/common/application/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Time tracking tool')
    .setDescription('The time tracking verifying tool api for Slack Bot')
    .setVersion('1.0')
    .addTag('Time Tracker')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config().port, () => {
    Logger.log(`Server is running on port ${config().port}`);
  });
}
bootstrap();
