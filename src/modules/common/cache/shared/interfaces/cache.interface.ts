import { CacheResult } from './cache-result.interface';

export abstract class Cache {
  abstract get<T = unknown>(key: string): Promise<CacheResult<T>>;

  abstract set<T = unknown>(key: string, value: T): Promise<T>;

  abstract has(key: string): Promise<boolean>;
}
