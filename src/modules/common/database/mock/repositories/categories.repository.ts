import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  CategoryEntity,
  CategoriesRepository,
} from '../../../../categories/v1';
import { Connection } from '../../common';

@Injectable()
export class MockCategoriesRepository implements CategoriesRepository {
  constructor(protected readonly connection: Connection) {}

  categories(_skip: number, take: number): Promise<CategoryEntity[]> {
    return Promise.resolve(
      Array.from(
        {
          length: take,
        },
        () => ({
          id: randomUUID(),
        }),
      ),
    );
  }
}
