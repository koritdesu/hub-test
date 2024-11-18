import { NestInterceptor } from '@nestjs/common';
import { CacheStrategyResult } from '../shared';
import { CacheInterceptor } from '../shared/cache.interceptor';

export class RedisCacheInterceptor
  extends CacheInterceptor
  implements NestInterceptor<unknown, unknown>
{
  protected key(result: CacheStrategyResult): string {
    return result.key.join(':');
  }
}
