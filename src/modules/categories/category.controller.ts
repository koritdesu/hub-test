import {
  Controller,
  Get,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { RedisCacheInterceptor } from '../common/cache/redis';
import { CategoryService } from './category.service';
import {
  CategoriesFindAllRequestDto,
  CategoriesFindAllResponseDto,
} from './dto';

@Controller({
  path: ['categories'],
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseInterceptors(RedisCacheInterceptor)
  @SerializeOptions({
    type: CategoriesFindAllResponseDto,
  })
  findAll(
    @Query() query: CategoriesFindAllRequestDto,
  ): Promise<CategoriesFindAllResponseDto[]> {
    return this.categoryService.findAll(query);
  }
}
