import { FastifyRequest } from 'fastify';
import { mergeWith } from 'lodash';
import { CacheStrategy, CacheStrategyResult } from '../interfaces';
import { StandardCacheStrategy } from './standard.cache-strategy';

export class UserCacheStrategy
  extends StandardCacheStrategy
  implements CacheStrategy
{
  execute(request: FastifyRequest): CacheStrategyResult {
    // TODO: извлечь userId из request
    const result: Partial<CacheStrategyResult> = {
      key: ['00000000-0000-0000-0000-000000000000'],
    };

    return mergeWith(super.execute(request), result, (value, source) => {
      if (Array.isArray(value)) {
        return value.concat(source);
      }
    });
  }
}
