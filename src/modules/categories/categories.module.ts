import { Module } from '@nestjs/common';
import {
  CategoriesRepository,
  ClickhouseFastModule,
  ICategoriesRepository,
} from '../common/database';
import * as v1 from './v1';

@Module({
  imports: [
    ClickhouseFastModule.forFeature([
      {
        provide: ICategoriesRepository,
        useClass: CategoriesRepository,
      },
    ]),
  ],
  controllers: [v1.CategoriesController],
  providers: [v1.CategoriesService],
})
export class CategoriesModule {}
