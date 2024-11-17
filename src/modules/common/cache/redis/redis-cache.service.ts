import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Readable } from 'node:stream';
import { Cache, CacheResult } from '../shared';

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

  async set<T = unknown>(key: string, value: T): Promise<T> {
    await this.redis.set(key, JSON.stringify(value));

    return value;
  }

  async has(key: string): Promise<boolean> {
    return Boolean(await this.redis.exists(key));
  }
}
