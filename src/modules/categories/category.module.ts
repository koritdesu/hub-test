import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../common/cache/redis';
import { MockCategoryRepository, MockModule } from '../common/database';
import { RateLimitModule } from '../common/rate-limit';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MockModule.register([
      {
        provide: CategoryRepository,
        useClass: MockCategoryRepository,
      },
    ]),
    RedisCacheModule.forFeature(),
    RateLimitModule.forFeature(),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
