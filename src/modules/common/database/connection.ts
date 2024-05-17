import { plainToInstance } from 'class-transformer';
import { LoggerService } from '../logger';
import { ConnectionParams } from './connection-params.interface';
import { Driver } from './driver.interface';

export class Connection {
  constructor(
    readonly driver: Driver,
    private readonly loggerService: LoggerService,
  ) {}

  query<T>(query: string, params?: ConnectionParams<T>): Promise<T>;
  query<T = unknown>(
    query: string,
    params?: ConnectionParams<unknown>,
  ): Promise<T>;
  async query<T>(query: string, params?: ConnectionParams<T>): Promise<T> {
    this.loggerService.debug(query);

    const data = await this.driver.query<T>(query);
    if (params?.type) {
      return plainToInstance(params.type, data);
    }

    return data;
  }
}
