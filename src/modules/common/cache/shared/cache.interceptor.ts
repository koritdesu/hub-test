import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { from, Observable, tap } from 'rxjs';
import { TrackingService } from '../../tracking';
import { CacheOptions } from './cache-options.decorator';
import { Cache } from './interfaces';

@Injectable()
export abstract class CacheInterceptor
  implements NestInterceptor<unknown, unknown>
{
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    protected readonly reflector: Reflector,
    private readonly cache: Cache,
    private readonly trackingService: TrackingService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    // TODO: продумать как имлементировать разное поведение у стратегий
    // пока требуется привязка кэша к юзеру и настройка expiry
    const options = this.reflector.get(CacheOptions, context.getClass());
    options.strategies.map((strategy) => strategy.execute(request));

    const key = this.key(request);

    if (await this.cache.has(key)) {
      const cached = await this.cache.get(key).catch((error) => {
        this.logger.warn(
          this.trackingService.label(this.cache.set).concat('\n', error),
        );
      });

      if (cached) {
        return from(cached.stream());
      }
    }

    return next.handle().pipe(
      tap((value) => {
        this.cache
          .set(key, value, {
            expiry: undefined,
          })
          .catch((error) => {
            this.logger.warn(
              this.trackingService.label(this.cache.set).concat('\n', error),
            );
          });
      }),
    );
  }

  protected abstract key(request: FastifyRequest): string;
}
