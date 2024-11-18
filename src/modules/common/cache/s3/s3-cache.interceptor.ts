import { Injectable, NestInterceptor } from '@nestjs/common';
import { CacheStrategyResult } from '../shared';
import { CacheInterceptor } from '../shared/cache.interceptor';

@Injectable()
export class S3CacheInterceptor
  extends CacheInterceptor
  implements NestInterceptor<unknown, unknown>
{
  protected key(result: CacheStrategyResult): string {
    return result.key.join('/');
  }
}
