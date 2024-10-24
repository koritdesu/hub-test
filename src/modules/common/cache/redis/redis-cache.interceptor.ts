/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, NestInterceptor } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { TrackingService } from '../../tracking';
import { CacheInterceptor } from '../shared/cache.interceptor';
import { RedisCacheService } from './redis-cache.service';

@Injectable()
export class RedisCacheInterceptor
  extends CacheInterceptor
  implements NestInterceptor
{
  constructor(
    redisCacheService: RedisCacheService,
    trackingService: TrackingService,
  ) {
    super(redisCacheService, trackingService);
  }

  protected key(request: FastifyRequest): string {
    return 'key';
  }
}
