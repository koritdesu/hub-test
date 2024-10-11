import helmet from '@fastify/helmet';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AppConfigService } from './configs';

async function bootstrap() {
  const logger = new Logger('Main');

  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    {
      bufferLogs: true,
      forceCloseConnections: true,
    },
  );

  app.useLogger(logger);
  app.enableShutdownHooks();

  await app.register(helmet, {
    contentSecurityPolicy: false,
  });

  app.enableCors();

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(app.get(AppConfigService).port, '0.0.0.0');
  logger.log('🚀 Application is running');
}
bootstrap();
