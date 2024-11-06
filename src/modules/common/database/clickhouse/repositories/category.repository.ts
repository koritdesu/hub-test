import { Injectable } from '@nestjs/common';
import { Category, CategoryRepository } from '../../../../categories';
import { Connection } from '../../common';
import { categoriesFindAllQuery } from '../queries';

@Injectable()
export class ClickhouseCategoryRepository implements CategoryRepository {
  constructor(protected readonly connection: Connection) {}

  findAll(skip: number, take: number): Promise<Category[]> {
    return this.connection.query(categoriesFindAllQuery).run<Category[]>({
      params: {
        skip,
        take,
      },
    });
  }
}
