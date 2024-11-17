import { CacheResult } from './cache-result.interface';
import { SetOptions } from './set-options.interface';

export abstract class Cache {
  abstract get<T = unknown>(key: string): Promise<CacheResult<T>>;

  abstract set<T = unknown>(
    key: string,
    value: T,
    options: SetOptions,
  ): Promise<T>;

  abstract has(key: string): Promise<boolean>;
}
