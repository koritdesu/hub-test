import {
  CategoriesFindAllRequestDto,
  CategoriesFindAllResponseDto,
} from '../dto';

export const ICategoriesService = Symbol('CategoriesService');

export interface ICategoriesService {
  findAll(
    query: CategoriesFindAllRequestDto,
  ): Promise<CategoriesFindAllResponseDto[]>;
}
