import { DynamicModule, Module } from '@nestjs/common';
import { TrackingModule } from '../../tracking';
import { RedisCacheService } from './redis-cache.service';

@Module({})
export class RedisCacheModule {
  static register(): DynamicModule {
    return {
      module: this,
      imports: [TrackingModule],
      providers: [RedisCacheService],
      exports: [RedisCacheService, TrackingModule],
    };
  }
}
