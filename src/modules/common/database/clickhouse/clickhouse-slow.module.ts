import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDatabaseModule } from '../create-database-module.helper';
import { createClickhouseDriver } from './create-clickhouse-driver.helper';

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
