import { Injectable } from '@nestjs/common';
import { Connection } from '../../common';
import { CategoriesFindAllEntity, CategoriesFindAllParams } from '../entities';
import { CategoriesFindAllMapper } from '../mappers';
import { categoriesFindAllQuery } from '../queries';
import { ICategoriesRepository } from './interfaces';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(protected readonly connection: Connection) {}

  findAll(params: CategoriesFindAllParams): Promise<CategoriesFindAllEntity[]> {
    return this.connection
      .query(categoriesFindAllQuery)
      .run<CategoriesFindAllEntity[]>({
        params,
        mapper: CategoriesFindAllMapper,
      });
  }
}
