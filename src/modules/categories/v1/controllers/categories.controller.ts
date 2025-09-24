import {
  Controller,
  Get,
  Header,
  Query,
  SerializeOptions,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { RedisCacheInterceptor } from '../../../common/cache/redis';
import { CacheOptions } from '../../../common/cache/shared';
import { UserCacheStrategy } from '../../../common/cache/shared/strategies';
import { StandardCacheStrategy } from '../../../common/cache/shared/strategies/standard.cache-strategy';
import { RateLimitInterceptor } from '../../../common/rate-limit';
import {
  CategoriesReportRequestDto,
  CategoriesRequestDto,
  CategoryResponseDto,
} from '../dto';
import { CategoriesReportService, CategoriesService } from '../services';

@Controller({
  path: ['categories'],
  version: '1',
})
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly categoriesReportService: CategoriesReportService,
  ) {}

  @Get()
  @UseInterceptors(RedisCacheInterceptor, RateLimitInterceptor)
  @CacheOptions({
    strategies: [UserCacheStrategy],
  })
  @SerializeOptions({
    type: CategoryResponseDto,
  })
  findAll(
    @Query() query: CategoriesRequestDto,
  ): Promise<CategoryResponseDto[]> {
    return this.categoriesService.categories(query);
  }

  @Get('report')
  @Header(
    'content-type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @UseInterceptors(RedisCacheInterceptor, RateLimitInterceptor)
  @CacheOptions({
    strategies: [StandardCacheStrategy],
  })
  async report(
    @Query() query: CategoriesReportRequestDto,
  ): Promise<StreamableFile> {
    const report =
      await this.categoriesReportService.buildCategoriesReport(query);

    return new StreamableFile(Buffer.from(report.data));
  }
}
