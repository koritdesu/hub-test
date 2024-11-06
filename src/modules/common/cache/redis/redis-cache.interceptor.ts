/* eslint-disable @typescript-eslint/no-unused-vars */

import { NestInterceptor } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { CacheInterceptor } from '../shared/cache.interceptor';

export class RedisCacheInterceptor
  extends CacheInterceptor
  implements NestInterceptor<unknown, unknown>
{
  protected key(request: FastifyRequest): string {
    return 'key';
  }
}
