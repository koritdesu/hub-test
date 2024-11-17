import { Injectable, NestInterceptor } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { createHash } from 'node:crypto';
import { CacheInterceptor } from '../shared/cache.interceptor';

@Injectable()
export class S3CacheInterceptor
  extends CacheInterceptor
  implements NestInterceptor<unknown, unknown>
{
  protected key(request: FastifyRequest): string {
    return createHash('SHA256').update(request.url).digest('hex');
  }
}
