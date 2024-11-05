/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { Cache, CacheResult } from '../shared';

@Injectable()
export class RedisCacheService implements Cache {
  async get<T = unknown>(key: string): Promise<CacheResult<T>> {
    throw new Error('Method not implemented.');
  }

  async set<T = unknown>(key: string, value: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async has(key: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
