import { DynamicModule, Module } from '@nestjs/common';
import { Client } from 'minio';
import { TrackingModule } from '../../tracking';
import { Cache } from '../shared';
import { S3CacheConfig } from './interfaces';
import { S3CacheService } from './s3-cache.service';

@Module({})
export class S3CacheModule {
  static forFeature(config: S3CacheConfig): DynamicModule {
    const client = new Client(config);

    return {
      module: S3CacheModule,
      imports: [TrackingModule],
      providers: [
        {
          provide: Cache,
          useValue: new S3CacheService(client),
        },
      ],
      exports: [Cache, TrackingModule],
    };
  }
}
