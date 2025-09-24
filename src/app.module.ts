import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import Joi from 'joi';
import { AppConfigService } from './configs';
import { BrowserExtensionModule } from './modules/browser-extension';
import { CategoriesModule } from './modules/categories';
import { RedisCacheModule } from './modules/common/cache/redis';
import { RateLimitModule } from './modules/common/rate-limit';
import { ReportModule } from './modules/common/report';
import {
  MeasureExecutionTimeInterceptor,
  TrackingModule,
} from './modules/common/tracking';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(1234),
      }),
    }),
    RedisCacheModule,
    RateLimitModule.forRoot({}),
    ReportModule.forRoot({}),
    TrackingModule,
    BrowserExtensionModule,
    CategoriesModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MeasureExecutionTimeInterceptor,
    },
    AppConfigService,
  ],
})
export class AppModule {}
