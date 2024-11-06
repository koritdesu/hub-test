import { Module } from '@nestjs/common';
import { TrackingModule } from '../../tracking';
import { Cache } from '../shared';
import { RedisCacheService } from './redis-cache.service';

@Module({
  imports: [TrackingModule],
  providers: [
    {
      provide: Cache,
      useClass: RedisCacheService,
    },
  ],
  exports: [Cache, TrackingModule],
})
export class RedisCacheModule {}
