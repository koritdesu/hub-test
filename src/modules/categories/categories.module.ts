import { Module, Type } from '@nestjs/common';
import { RedisCacheModule } from '../common/cache/redis';
import {
  CategoriesRepository,
  ClickhouseFastModule,
  ICategoriesRepository,
} from '../common/database';
import { V1CategoriesController, V1CategoriesService } from './v1';

@Module({})
export class CategoriesModule {
  static register<T extends Type>(module: T = class {} as T): T {
    Module({
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
    })(module);

    return module;
  }
}
