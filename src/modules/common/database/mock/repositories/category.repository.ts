import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Category, CategoryRepository } from '../../../../categories';
import { Connection } from '../../common';

@Injectable()
export class MockCategoryRepository implements CategoryRepository {
  constructor(protected readonly connection: Connection) {}

  findAll(_skip: number, take: number): Promise<Category[]> {
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
