/* eslint-disable @typescript-eslint/ban-types */

import { Injectable } from '@nestjs/common';
import { AlsService } from '../als';
import { LoggerService } from '../logger';
import { Tracker } from './interfaces';

@Injectable()
export class TrackingService {
  constructor(
    private readonly alsService: AlsService,
    private readonly loggerService: LoggerService,
  ) {}

  get requestId(): string {
    return this.alsService.getStore().requestId;
  }

  async measureExecutionTime<
    T extends (...parameters: any[]) => any,
    R = ReturnType<T>,
  >(fn: T, ...parameters: Parameters<T>): Promise<R> {
    const tracker = this.time(fn.name);
    try {
      return await fn(parameters);
    } finally {
      tracker.end();
    }
  }

  time(label: string): Tracker {
    const start = process.hrtime.bigint();
    return {
      end: () => {
        const end = process.hrtime.bigint() - start;
        this.loggerService.debug(
          `${label} executed in ${Number(end / 1000000n)}ms`,
        );
      },
    };
  }

  label(...handlers: Function[]): string {
    return handlers
      .map(({ name }) => name)
      .join(':')
      .concat('-', this.requestId);
  }
}
