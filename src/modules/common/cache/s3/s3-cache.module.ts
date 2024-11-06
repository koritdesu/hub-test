import { Module } from '@nestjs/common';
import { TrackingModule } from '../../tracking';
import { Cache } from '../shared';
import { S3CacheService } from './s3-cache.service';

@Module({
  imports: [TrackingModule],
  providers: [
    {
      provide: Cache,
      useClass: S3CacheService,
    },
  ],
  exports: [Cache, TrackingModule],
})
export class S3CacheModule {}
