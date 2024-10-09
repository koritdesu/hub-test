import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../common/cache/redis';
import {
  CategoriesRepository,
  ClickhouseFastModule,
  ICategoriesRepository,
} from '../common/database';
import { createDynamicModule } from '../common/module';
import { V1CategoriesController, V1CategoriesService } from './v1';

@Module({})
export class CategoriesModule extends createDynamicModule({
  imports: [
    ClickhouseFastModule.register([
      {
        provide: ICategoriesRepository,
        useClass: CategoriesRepository,
      },
    ]),
    RedisCacheModule.register(),
  ],
  controllers: [V1CategoriesController],
  providers: [V1CategoriesService],
}) {}
