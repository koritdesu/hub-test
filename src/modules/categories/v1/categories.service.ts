import { Inject, Injectable } from '@nestjs/common';
import { ICategoriesRepository } from 'src/modules/common/database';
import {
  CategoriesFindAllRequestDto,
  CategoriesFindAllResponseDto,
} from './dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(ICategoriesRepository)
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  findAll(
    query: CategoriesFindAllRequestDto,
  ): Promise<CategoriesFindAllResponseDto[]> {
    return this.categoriesRepository.findAll(query);
  }
}
