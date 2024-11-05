/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, NestInterceptor } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { CacheInterceptor } from '../shared/cache.interceptor';

@Injectable()
export class RedisCacheInterceptor
  extends CacheInterceptor
  implements NestInterceptor
{
  protected key(request: FastifyRequest): string {
    return 'key';
  }
}
