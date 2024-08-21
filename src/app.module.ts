import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CategoriesModule } from './modules/categories';
import {
  MeasureExecutionTimeInterceptor,
  TrackingModule,
} from './modules/common/tracking';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
  ],
})
export class AppModule {}
