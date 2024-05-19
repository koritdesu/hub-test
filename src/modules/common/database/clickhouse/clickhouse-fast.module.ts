import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDatabaseModule } from '../common';
import { createClickhouseDriver } from './helpers';

@Module({})
export class ClickhouseFastModule extends createDatabaseModule(
  (configService: ConfigService) =>
    createClickhouseDriver({
      host: configService.getOrThrow<string>('CH_FAST_HOST'),
      port: configService.getOrThrow<number>('CH_FAST_PORT'),
      username: configService.getOrThrow<string>('CH_FAST_USERNAME'),
      password: configService.getOrThrow<string>('CH_FAST_PASSWORD'),
    }),
) {}
