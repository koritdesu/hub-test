import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoriesRequestDto, CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  findAll(query: CategoriesRequestDto): Promise<CategoryDto[]> {
    return this.categoryRepository.findAll(query.skip, query.take);
  }
}
