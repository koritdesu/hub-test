import {
  Controller,
  Get,
  Inject,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { RedisCacheInterceptor } from 'src/modules/common/cache/redis';
import { BrandsFindAllResponseDto } from './dto';
import { IV2BrandsService } from './v2-brands-service.interface';

@Controller({
  path: ['brands'],
  version: '2',
})
export class V2BrandsController {
  constructor(
    @Inject(IV2BrandsService) private readonly brandsService: IV2BrandsService,
  ) {}

  @Get()
  @UseInterceptors(RedisCacheInterceptor)
  @SerializeOptions({
    type: BrandsFindAllResponseDto,
  })
  findAll(): Promise<BrandsFindAllResponseDto[]> {
    return this.brandsService.findAll();
  }
}
