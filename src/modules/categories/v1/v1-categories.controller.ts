import { Controller, Get, Query, SerializeOptions } from '@nestjs/common';
import {
  CategoriesFindAllRequestDto,
  CategoriesFindAllResponseDto,
} from './dto';
import { V1CategoriesService } from './v1-categories.service';

@Controller('v1/categories')
export class V1CategoriesController {
  constructor(private readonly categoriesService: V1CategoriesService) {}

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
