/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimitService {
  isLimitExceeded(userId: string, value: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  increase(userId: string, value = 1): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
