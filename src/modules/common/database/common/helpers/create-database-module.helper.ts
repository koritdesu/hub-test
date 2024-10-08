import { DynamicModule, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TrackingModule, TrackingService } from 'src/modules/common/tracking';
import { Connection } from '../connection';
import { Driver } from '../interfaces/driver.interface';

export function createDatabaseModule(
  driverFactory: (configService: ConfigService) => Driver,
) {
  return class DatabaseModule {
    static forFeature(repositories: Provider[]): DynamicModule {
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
