import {
  CategoriesFindAllParams,
  CategoriesFindAllResult,
} from '../../interfaces';

export const ICategoriesRepository = Symbol('ICategoriesRepository');
export interface ICategoriesRepository {
  findAll(params: CategoriesFindAllParams): Promise<CategoriesFindAllResult[]>;
}
