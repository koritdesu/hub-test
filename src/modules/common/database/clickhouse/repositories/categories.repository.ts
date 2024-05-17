import { Injectable } from '@nestjs/common';
import { Connection } from '../../connection';
import { categoriesFindAllQuery } from '../queries';
import { CategoriesFindAllParams, CategoriesFindAllResult } from '../types';
import { ICategoriesRepository } from './interfaces';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(protected readonly connection: Connection) {}

  findAll(params: CategoriesFindAllParams): Promise<CategoriesFindAllResult[]> {
    return this.connection.query<CategoriesFindAllResult[]>(
      categoriesFindAllQuery(params),
      {
        type: CategoriesFindAllResult,
      },
    );
  }
}
