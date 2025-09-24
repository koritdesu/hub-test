import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../repositories';
import { CategoriesRequestDto, CategoryResponseDto } from '../dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  categories(query: CategoriesRequestDto): Promise<CategoryResponseDto[]> {
    return this.categoriesRepository.categories(query.skip, query.take);
  }
}
