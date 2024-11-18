import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { mergeWith, MergeWithCustomizer } from 'lodash';
import { from, Observable, tap } from 'rxjs';
import { TrackingService } from '../../tracking';
import { CacheOptions } from './cache-options.decorator';
import { Cache, CacheStrategyResult } from './interfaces';

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

    const options = this.reflector.get(CacheOptions, context.getHandler());
    const customizer: MergeWithCustomizer = (value, source) => {
      if (Array.isArray(value)) {
        return value.concat(source);
      }
    };

    const result: CacheStrategyResult = mergeWith(
      {},
      ...options.strategies.map((strategy) => new strategy().execute(request)),
      customizer,
    );

    const key = this.key(result);

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
        this.cache.set(key, value, result).catch((error) => {
          this.logger.warn(
            this.trackingService.label(this.cache.set).concat('\n', error),
          );
        });
      }),
    );
  }

  protected abstract key(result: CacheStrategyResult): string;
}
