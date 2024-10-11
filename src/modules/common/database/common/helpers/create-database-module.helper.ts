import { DynamicModule, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TrackingModule, TrackingService } from '../../../tracking';
import { Connection } from '../connection';
import { Driver } from '../interfaces/driver.interface';

export function createDatabaseModule(
  driverFactory: (configService: ConfigService) => Driver,
) {
  return class DatabaseModule {
    // TODO: должно быть 2 метода forRoot и forFeature
    // forRoot задает общее подключение
    // forFeature определяет репозитории
    static register(repositories: Provider[]): DynamicModule {
      return {
        module: this,
        imports: [TrackingModule],
        providers: [
          {
            provide: Connection,
            useFactory: (
              configService: ConfigService,
              trackingService: TrackingService,
            ) => new Connection(driverFactory(configService), trackingService),
            inject: [ConfigService, TrackingService],
          },
          ...repositories,
        ],
        exports: repositories,
      };
    }
  };
}
