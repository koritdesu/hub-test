import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Readable } from 'node:stream';
import { Cache, CacheResult, SetOptions } from '../shared';

@Injectable()
export class RedisCacheService implements Cache {
  constructor(private readonly redis: Redis) {}

  async get<T = unknown>(key: string): Promise<CacheResult<T>> {
    const result = String(await this.redis.get(key));

    return {
      stream: () => Readable.from(result),
      value: () => Promise.resolve(JSON.parse(result)),
    };
  }

  async set<T = unknown>(
    key: string,
    value: T,
    options: SetOptions,
  ): Promise<T> {
    await this.redis.setex(
      key,
      Math.round((options.expiresAt - Date.now()) / 1000),
      JSON.stringify(value),
    );

    return value;
  }

  async has(key: string): Promise<boolean> {
    return Boolean(await this.redis.exists(key));
  }
}
