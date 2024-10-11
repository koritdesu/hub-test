import { Inject, Injectable } from '@nestjs/common';
import { ICategoriesRepository } from 'src/modules/common/database';
import {
  CategoriesFindAllRequestDto,
  CategoriesFindAllResponseDto,
} from './dto';
import { ICategoriesService } from './interfaces';

@Injectable()
export class V1CategoriesService implements ICategoriesService {
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
