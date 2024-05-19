import { DynamicModule, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule, LoggerService } from '../../../logger';
import { Connection } from '../connection';
import { Driver } from '../interfaces/driver.interface';

export function createDatabaseModule(
  driverFactory: (configService: ConfigService) => Driver,
) {
  return class {
    static forFeature(repositories: Provider[]): DynamicModule {
      return {
        module: this,
        imports: [LoggerModule.forFeature(this)],
        providers: [
          {
            provide: Connection,
            useFactory: (
              configService: ConfigService,
              loggerService: LoggerService,
            ) => new Connection(driverFactory(configService), loggerService),
            inject: [ConfigService, LoggerService],
          },
          ...repositories,
        ],
        exports: repositories,
      };
    }
  };
}
