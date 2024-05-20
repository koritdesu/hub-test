import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { AlsModule, AlsService } from '../als';
import { LoggerModule } from '../logger';
import { TrackingService } from './tracking.service';

@Module({
  imports: [AlsModule, LoggerModule.forFeature(TrackingModule)],
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule implements NestModule {
  constructor(private readonly alsService: AlsService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, _res: Response, next: NextFunction) => {
        const requestId = req.headers['x-request-id'] ?? randomUUID();
        if (typeof requestId === 'string') {
          this.alsService.run(
            {
              requestId,
            },
            () => next(),
          );
        } else {
          next();
        }
      })
      .forRoutes('*');
  }
}
