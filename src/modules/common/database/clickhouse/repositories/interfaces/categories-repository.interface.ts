import { CategoriesFindAllParams, CategoriesFindAllResult } from '../../types';

export const ICategoriesRepository = Symbol('ICategoriesRepository');
export interface ICategoriesRepository {
  findAll(params: CategoriesFindAllParams): Promise<CategoriesFindAllResult[]>;
}
