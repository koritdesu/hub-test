import { Injectable } from '@nestjs/common';
import { Client } from 'minio';
import { json } from 'node:stream/consumers';
import { Cache, CacheResult, SetOptions } from '../shared';

@Injectable()
export class S3CacheService implements Cache {
  constructor(private readonly client: Client) {}

  async get<T = unknown>(key: string): Promise<CacheResult<T>> {
    const result = await this.client.getObject('cache', key);

    return {
      stream: () => result,
      value: () => json(result) as Promise<T>,
    };
  }

  async set<T = unknown>(
    key: string,
    value: T,
    options: SetOptions,
  ): Promise<T> {
    await this.client.putObject(
      'cache',
      key,
      JSON.stringify(value),
      undefined,
      {
        'Expires-In': options.expiresIn,
      },
    );

    return value;
  }

  async has(key: string): Promise<boolean> {
    try {
      const result = await this.client.statObject('cache', key);

      return Number(result.metaData['Expires-In']) <= Date.now();
    } catch {
      return false;
    }
  }
}
