import { Injectable } from '@nestjs/common';
import type Redis from 'ioredis';

@Injectable()
export class RateLimitService {
  constructor(private readonly redis: Redis) {}

  async isLimitExceeded(
    userId: string,
    url: string,
    limit: number,
  ): Promise<boolean> {
    const value = Number(await this.redis.get(this.key(userId, url)));

    if (Number.isNaN(value)) {
      return false;
    }

    return value >= limit;
  }

  async increase(userId: string, url: string, value = 1): Promise<void> {
    await this.redis.incrby(this.key(userId, url), value);
  }

  private key(userId: string, url: string): string {
    return `users:${userId}:api:${url.replace(/\\/g, '-')}:rate-limit`;
  }
}
