import { Controller, Get, Query, SerializeOptions } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  CategoriesFindAllRequestDto,
  CategoriesFindAllResponseDto,
} from './dto';

@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @SerializeOptions({
    type: CategoriesFindAllResponseDto,
  })
  findAll(
    @Query() query: CategoriesFindAllRequestDto,
  ): Promise<CategoriesFindAllResponseDto[]> {
    return this.categoriesService.findAll(query);
  }
}
