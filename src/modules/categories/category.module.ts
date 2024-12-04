import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../common/cache/redis';
import {
  ClickhouseCategoryRepository,
  ClickhouseFastModule,
} from '../common/database';
import { RateLimitModule } from '../common/rate-limit';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  imports: [
    ClickhouseFastModule.register([
      {
        provide: CategoryRepository,
        useClass: ClickhouseCategoryRepository,
      },
    ]),
    RedisCacheModule.forFeature(),
    RateLimitModule.forFeature(),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
