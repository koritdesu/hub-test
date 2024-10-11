import {
  CategoriesFindAllRequestDto,
  CategoriesFindAllResponseDto,
} from './dto';

export const IV1CategoriesService = Symbol('CategoriesService');

export interface IV1CategoriesService {
  findAll(
    query: CategoriesFindAllRequestDto,
  ): Promise<CategoriesFindAllResponseDto[]>;
}
