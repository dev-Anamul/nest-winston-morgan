import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './global-exception/global-exception.filter';
import { customMorganFormat, morganStream, winstonLoggerConfig } from './winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLoggerConfig,
  });

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  // helmet setup for security
  app.use(helmet());

  // morgan
  app.use(morgan(customMorganFormat, { stream: morganStream }));

  // enable cors
  app.enableCors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' });

  // global filters
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(3000);
}
bootstrap();
