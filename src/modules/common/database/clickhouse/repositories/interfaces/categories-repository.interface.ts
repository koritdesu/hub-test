import {
  CategoriesFindAllEntity,
  CategoriesFindAllParams,
} from '../../entities';

export const ICategoriesRepository = Symbol('CategoriesRepository');

export interface ICategoriesRepository {
  findAll(params: CategoriesFindAllParams): Promise<CategoriesFindAllEntity[]>;
}
