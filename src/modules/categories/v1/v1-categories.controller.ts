import {
  Controller,
  Get,
  Inject,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { RedisCacheInterceptor } from 'src/modules/common/cache/redis';
import {
  CategoriesFindAllRequestDto,
  CategoriesFindAllResponseDto,
} from './dto';
import { ICategoriesService } from './interfaces';

@Controller({
  path: ['categories'],
  version: '1',
})
export class V1CategoriesController {
  constructor(
    @Inject(ICategoriesService)
    private readonly categoriesService: ICategoriesService,
  ) {}

  @Get()
  @UseInterceptors(RedisCacheInterceptor)
  @SerializeOptions({
    type: CategoriesFindAllResponseDto,
  })
  findAll(
    @Query() query: CategoriesFindAllRequestDto,
  ): Promise<CategoriesFindAllResponseDto[]> {
    return this.categoriesService.findAll(query);
  }
}
