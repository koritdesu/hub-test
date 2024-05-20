import { Injectable } from '@nestjs/common';
import { Connection } from '../../common';
import {
  CategoriesFindAllParams,
  CategoriesFindAllResult,
} from '../interfaces';
import { CategoriesFindAllMapper } from '../mappers';
import { categoriesFindAllQuery } from '../queries';
import { ICategoriesRepository } from './interfaces';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(protected readonly connection: Connection) {}

  findAll(params: CategoriesFindAllParams): Promise<CategoriesFindAllResult[]> {
    return this.connection.query<CategoriesFindAllResult[]>(
      categoriesFindAllQuery(params),
      {
        name: `${this.constructor.name}.${this.findAll.name}`,
        mapper: CategoriesFindAllMapper,
      },
    );
  }
}
