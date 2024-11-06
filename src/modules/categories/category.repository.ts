import { Category } from './category.entity';

export abstract class CategoryRepository {
  abstract findAll(skip: number, take: number): Promise<Category[]>;
}
