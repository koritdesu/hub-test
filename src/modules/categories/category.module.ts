import { RedisCacheModule } from '../common/cache/redis';
import {
  ClickhouseCategoryRepository,
  ClickhouseFastModule,
} from '../common/database';
import { createDynamicModule } from '../common/module';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

export class CategoryModule extends createDynamicModule({
  imports: [
    ClickhouseFastModule.register([
      {
        provide: CategoryRepository,
        useClass: ClickhouseCategoryRepository,
      },
    ]),
    RedisCacheModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
}) {}
