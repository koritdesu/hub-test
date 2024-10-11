import { Inject, Injectable } from '@nestjs/common';
import { ICategoriesRepository } from 'src/modules/common/database';
import {
  CategoriesFindAllRequestDto,
  CategoriesFindAllResponseDto,
} from './dto';
import { IV1CategoriesService } from './v1-categories-service.interface';

@Injectable()
export class V1CategoriesService implements IV1CategoriesService {
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
