import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable, tap } from 'rxjs';
import { TrackingService } from '../../tracking';
import { Cache } from './interfaces';

export abstract class CacheInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly cache: Cache,
    private readonly trackingService: TrackingService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> | Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    return next.handle().pipe(
      tap((value) => {
        this.cache.set(this.key(request), value).catch((error) => {
          this.logger.warn(
            this.trackingService.label(this.cache.set).concat('\n', error),
          );
        });
      }),
    );
  }

  protected abstract key(request: FastifyRequest): string;
}
