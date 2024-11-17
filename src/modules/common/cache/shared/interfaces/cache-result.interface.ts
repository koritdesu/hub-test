import { Readable } from 'node:stream';

export interface CacheResult<T> {
  stream(): Readable;
  value(): Promise<T>;
}
