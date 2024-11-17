import { DynamicModule, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { TrackingModule } from '../../tracking';
import { Cache } from '../shared';
import { RedisCacheConfig } from './interfaces';
import { RedisCacheService } from './redis-cache.service';

@Module({})
export class RedisCacheModule {
  static forFeature(config: RedisCacheConfig): DynamicModule {
    const redis = new Redis(config);

    return {
      module: RedisCacheModule,
      imports: [TrackingModule],
      providers: [
        {
          provide: Cache,
          useValue: new RedisCacheService(redis),
        },
      ],
      exports: [Cache, TrackingModule],
    };
  }
}
