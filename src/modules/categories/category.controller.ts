import {
  Controller,
  Get,
  Header,
  Query,
  SerializeOptions,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { RedisCacheInterceptor } from '../common/cache/redis';
import { CacheOptions } from '../common/cache/shared';
import { UserCacheStrategy } from '../common/cache/shared/strategies';
import { StandardCacheStrategy } from '../common/cache/shared/strategies/standard.cache-strategy';
import { RateLimitInterceptor } from '../common/rate-limit';
import { CategoryReport } from './category.report';
import { CategoryService } from './category.service';
import {
  CategoriesReportRequestDto,
  CategoriesRequestDto,
  CategoryDto,
} from './dto';

@Controller({
  path: ['categories'],
  version: '1',
})
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryReport: CategoryReport,
  ) {}

  @Get()
  @UseInterceptors(RedisCacheInterceptor, RateLimitInterceptor)
  @CacheOptions({
    strategies: [UserCacheStrategy],
  })
  @SerializeOptions({
    type: CategoryDto,
  })
  findAll(@Query() query: CategoriesRequestDto): Promise<CategoryDto[]> {
    return this.categoryService.findAll(query);
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
    const report = await this.categoryReport.build({
      args: [query],
      type: query.type,
    });

    return new StreamableFile(Buffer.from(report.data));
  }
}
