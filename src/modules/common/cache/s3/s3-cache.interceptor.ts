/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, NestInterceptor } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { TrackingService } from '../../tracking';
import { CacheInterceptor } from '../shared/cache.interceptor';
import { S3CacheService } from './s3-cache.service';

@Injectable()
export class S3CacheInterceptor
  extends CacheInterceptor
  implements NestInterceptor
{
  constructor(
    s3CacheService: S3CacheService,
    trackingService: TrackingService,
  ) {
    super(s3CacheService, trackingService);
  }

  protected key(request: FastifyRequest): string {
    return 'key';
  }
}
