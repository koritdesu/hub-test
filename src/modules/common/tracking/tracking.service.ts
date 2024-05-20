import { Injectable } from '@nestjs/common';
import { AlsService } from '../als';
import { LoggerService } from '../logger';
import { Tracker } from './interfaces/tracker.interface';

@Injectable()
export class TrackingService {
  constructor(
    private readonly alsService: AlsService,
    private readonly loggerService: LoggerService,
  ) {}

  get requestId(): string {
    return this.alsService.getStore().requestId;
  }

  timeTracker(label: string): Tracker {
    this.loggerService.time(`${label} ${this.requestId}`);
    return {
      end: () => {
        this.loggerService.timeEnd(`${label} ${this.requestId}`);
      },
    };
  }
}
