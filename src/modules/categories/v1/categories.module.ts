import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../../common/cache/redis';
import { MockCategoriesRepository, MockModule } from '../../common/database';
import { RateLimitModule } from '../../common/rate-limit';
import { ReportModule } from '../../common/report';
import { CategoriesController } from './controllers';
import { CategoriesRepository } from './repositories';
import {
  CategoriesReport,
  CategoriesReportService,
  CategoriesService,
} from './services';

@Module({
  imports: [
    MockModule.register([
      {
        provide: CategoriesRepository,
        useClass: MockCategoriesRepository,
      },
    ]),
    RedisCacheModule.forFeature(),
    RateLimitModule.forFeature(),
    ReportModule.forFeature(V1CategoriesModule, [CategoriesReport]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesReportService],
})
export class V1CategoriesModule {}
