import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDatabaseModule } from '../common';
import { createClickhouseDriver } from './helpers';

@Module({})
export class ClickhouseSlowModule extends createDatabaseModule(
  (configService: ConfigService) =>
    createClickhouseDriver({
      host: configService.getOrThrow<string>('CH_SLOW_HOST'),
      port: configService.getOrThrow<number>('CH_SLOW_PORT'),
      username: configService.getOrThrow<string>('CH_SLOW_USERNAME'),
      password: configService.getOrThrow<string>('CH_SLOW_PASSWORD'),
    }),
) {}
