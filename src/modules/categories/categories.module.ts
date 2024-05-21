import { Module } from '@nestjs/common';
import {
  CategoriesRepository,
  ClickhouseFastModule,
  ICategoriesRepository,
} from '../common/database';
import { V1CategoriesController, V1CategoriesService } from './v1';

@Module({
  imports: [
    ClickhouseFastModule.forFeature([
      {
        provide: ICategoriesRepository,
        useClass: CategoriesRepository,
      },
    ]),
  ],
  controllers: [V1CategoriesController],
  providers: [V1CategoriesService],
})
export class CategoriesModule {}
