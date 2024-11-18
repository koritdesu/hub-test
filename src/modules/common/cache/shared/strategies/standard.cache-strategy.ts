import { createHash } from 'crypto';
import { FastifyRequest } from 'fastify';
import { CacheStrategy, CacheStrategyResult } from '../interfaces';

export class StandardCacheStrategy implements CacheStrategy {
  execute(request: FastifyRequest): CacheStrategyResult {
    const date = new Date();

    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);

    const [url, query] = request.url.slice(1).split('?');

    return {
      key: url
        .split('/')
        .concat(createHash('SHA256').update(query).digest('hex')),
      expiresAt: date.getTime(),
    };
  }
}
