import { CategoryEntity } from '../entities';

export abstract class CategoriesRepository {
  abstract categories(skip: number, take: number): Promise<CategoryEntity[]>;
}
