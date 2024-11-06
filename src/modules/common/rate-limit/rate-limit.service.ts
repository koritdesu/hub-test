/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RateLimitService {
  constructor(private readonly redis: Redis) {}

  async isLimitExceeded(
    userId: string,
    handler: Function,
    limit: number,
  ): Promise<boolean> {
    const value = await this.redis.get(this.key(userId, handler));

    if (value) {
      return Number(value) >= limit;
    }

    return false;
  }

  async increase(userId: string, handler: Function, value = 1): Promise<void> {
    await this.redis.incrby(this.key(userId, handler), value);
  }

  private key(userId: string, handler: Function): string {
    return `users:${userId}:api:${handler.name}:rate-limit`;
  }
}
