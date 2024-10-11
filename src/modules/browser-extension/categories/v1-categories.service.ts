import { Injectable, NotImplementedException } from '@nestjs/common';
import {
  CategoriesFindAllResponseDto,
  IV1CategoriesService,
} from 'src/modules/categories/v1';

@Injectable()
export class V1CategoriesService implements IV1CategoriesService {
  findAll(): Promise<CategoriesFindAllResponseDto[]> {
    throw new NotImplementedException();
  }
}
