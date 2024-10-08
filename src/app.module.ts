import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import Joi from 'joi';
import { AppConfigService } from './configs';
import { CategoriesModule } from './modules/categories';
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
    TrackingModule,
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
