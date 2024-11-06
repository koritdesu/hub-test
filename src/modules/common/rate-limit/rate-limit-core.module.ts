import { DynamicModule, Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { RateLimitConfig } from './interfaces';

@Global()
@Module({})
export class RateLimitCoreModule {
  static forRoot(config: RateLimitConfig): DynamicModule {
    const redis = {
      provide: Redis,
      useFactory: () => new Redis(config),
    };

    return {
      module: this,
      providers: [redis],
      exports: [redis],
    };
  }
}
