import {
  Controller,
  Get,
  Inject,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { RedisCacheInterceptor } from '../../common/cache/redis';
import { BrandsFindAllResponseDto } from './dto';
import { IV1BrandsService } from './v1-brands-service.interface';

@Controller({
  path: ['brands'],
  version: '1',
})
export class V1BrandsController {
  constructor(
    @Inject(IV1BrandsService) private readonly brandsService: IV1BrandsService,
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
