import { FastifyRequest } from 'fastify';
import { createHash } from 'node:crypto';
import { CacheStrategy, CacheStrategyResult } from '../interfaces';

export class StandardCacheStrategy implements CacheStrategy {
  execute(request: FastifyRequest): CacheStrategyResult {
    const date = new Date();

    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);

    const [url, query] = request.url.split('?');

    return {
      key: url
        .split('/')
        .slice(1)
        .concat(createHash('SHA256').update(query).digest('hex')),
      expiresAt: date.getTime(),
    };
  }
}
