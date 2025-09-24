import { Injectable } from '@nestjs/common';
import {
  CategoriesRepository,
  CategoryEntity,
} from '../../../../../categories/v1';
import { Connection } from '../../../common';
import { categoriesQuery } from '../../queries';

@Injectable()
export class ClickhouseCategoriesRepository implements CategoriesRepository {
  constructor(protected readonly connection: Connection) {}

  categories(skip: number, take: number): Promise<CategoryEntity[]> {
    return this.connection.query(categoriesQuery).run<CategoryEntity[]>({
      params: {
        skip,
        take,
      },
    });
  }
}
