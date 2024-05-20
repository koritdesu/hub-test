import { DynamicModule, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TrackingModule } from 'src/modules/common/tracking/tracking.module';
import { TrackingService } from 'src/modules/common/tracking/tracking.service';
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
        imports: [LoggerModule.forFeature(this), TrackingModule],
        providers: [
          {
            provide: Connection,
            useFactory: (
              configService: ConfigService,
              loggerService: LoggerService,
              trackingService: TrackingService,
            ) =>
              new Connection(
                driverFactory(configService),
                loggerService,
                trackingService,
              ),
            inject: [ConfigService, LoggerService, TrackingService],
          },
          ...repositories,
        ],
        exports: repositories,
      };
    }
  };
}
