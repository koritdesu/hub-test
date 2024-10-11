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
import { IV1CategoriesService } from './v1-categories-service.interface';

@Controller({
  path: ['categories'],
  version: '1',
})
export class V1CategoriesController {
  constructor(
    @Inject(IV1CategoriesService)
    private readonly categoriesService: IV1CategoriesService,
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
