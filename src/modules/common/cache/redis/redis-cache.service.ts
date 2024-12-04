import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Readable } from 'node:stream';
import { Cache, CacheResult, SetOptions } from '../shared';

@Injectable()
export class RedisCacheService implements Cache {
  constructor(private readonly redis: Redis) {}

  async get<T = unknown>(key: string): Promise<CacheResult<T>> {
    const result = await this.redis.getBuffer(key);

    if (!result) {
      throw new Error('Not found.');
    }

    return {
      stream: () => Readable.from(result),
      value: () => Promise.resolve(JSON.parse(result.toString('utf-8'))),
    };
  }

  // TODO: на уровне метода добавить возможность передавать любой тип данных
  // например стрим, буфер, объект
  // все что не стрим и не буфер, должно сериализовываться через JSON.stringify
  async set<T = unknown>(
    key: string,
    value: T,
    options: SetOptions,
  ): Promise<T> {
    const expiresAt = Math.round((options.expiresAt - Date.now()) / 1000);

    await this.redis.setex(
      key,
      expiresAt,
      Buffer.isBuffer(value) ? value : JSON.stringify(value),
    );

    return value;
  }

  async has(key: string): Promise<boolean> {
    return Boolean(await this.redis.exists(key));
  }
}
