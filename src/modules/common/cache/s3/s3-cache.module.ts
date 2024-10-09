import { DynamicModule, Module } from '@nestjs/common';
import { TrackingModule } from '../../tracking';
import { S3CacheService } from './s3-cache.service';

@Module({})
export class S3CacheModule {
  static register(): DynamicModule {
    return {
      module: this,
      imports: [TrackingModule],
      providers: [S3CacheService],
      exports: [S3CacheService, TrackingModule],
    };
  }
}
