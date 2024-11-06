import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RateLimitService } from './rate-limit.service';

@Injectable()
export class RateLimitInterceptor implements NestInterceptor<unknown, unknown> {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly rateLimitService: RateLimitService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Promise<Observable<unknown>> {
    // TODO: достать userId из request
    // достать limit из request.permissions / metadata

    const userId = '00000000-0000-0000-0000-000000000000';
    const handler = context.getHandler();
    const limit = 100;

    if (await this.rateLimitService.isLimitExceeded(userId, handler, limit)) {
      this.logger.debug(
        `User ${userId} has reached the limit (${limit}) for the ${handler.name}`,
      );

      throw new HttpException('Too Many Requests', 429);
    }

    return next
      .handle()
      .pipe(
        tap(() =>
          this.rateLimitService
            .increase(userId, handler)
            .catch(this.logger.warn.bind(this.logger)),
        ),
      );
  }
}
