import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RateLimitService } from './rate-limit.service';

@Injectable()
export class RateLimitInterceptor implements NestInterceptor<unknown, unknown> {
  constructor(private readonly rateLimitService: RateLimitService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Promise<Observable<unknown>> {
    // TODO: достать userId из request
    // достать ограничение из request / metadata

    const userId = '';
    const limit = 100;

    if (await this.rateLimitService.isLimitExceeded(userId, limit)) {
      throw new HttpException('Too Many Requests', 429);
    }

    return next.handle().pipe(
      tap(async () => {
        await this.rateLimitService.increase(userId, 1);
      }),
    );
  }
}
