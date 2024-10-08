import { Readable } from 'node:stream';

export interface Cache {
  get<T = unknown>(
    key: string,
  ): Promise<{
    stream(): Readable;
    value(): T;
  }>;
  set<T = unknown>(key: string, value: T): Promise<T>;
  has(key: string): Promise<boolean>;
}
