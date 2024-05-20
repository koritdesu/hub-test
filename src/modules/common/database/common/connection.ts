import { ClassConstructor, plainToInstance } from 'class-transformer';
import { LoggerService } from '../../logger';
import { TrackingService } from '../../tracking/tracking.service';
import { Driver } from './interfaces';

export interface ConnectionParams<T> {
  name?: string;
  mapper?: ClassConstructor<T>;
}

export class Connection {
  constructor(
    readonly driver: Driver,
    private readonly loggerService: LoggerService,
    private readonly trackingService: TrackingService,
  ) {}

  query<T>(query: string, params?: ConnectionParams<T>): Promise<T>;
  query<T = unknown>(
    query: string,
    params?: ConnectionParams<unknown>,
  ): Promise<T>;
  async query<T>(query: string, params?: ConnectionParams<T>): Promise<T> {
    const name = params?.name ?? this.query.name;

    this.loggerService.debug(
      `\n--${this.trackingService.requestId}\n`.concat(query),
    );

    const timeTracker = this.trackingService.timeTracker(name);
    const data = await this.driver.query<T>(query);
    timeTracker.end();

    if (params?.mapper) {
      return plainToInstance(params.mapper, data);
    }

    return data;
  }
}
