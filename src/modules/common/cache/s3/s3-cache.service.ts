import { Injectable } from '@nestjs/common';
import { Readable } from 'node:stream';
import { Cache } from '../shared';

@Injectable()
export class S3CacheService implements Cache {
  async get<T = unknown>(
    key: string,
  ): Promise<{
    stream(): Readable;
    value(): T;
  }> {
    throw new Error('Method not implemented.');
  }

  async set<T = unknown>(key: string, value: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async has(key: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
