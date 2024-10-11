import { Controller, Get, Inject, SerializeOptions } from '@nestjs/common';
import { CitiesFindAllResponseDto } from './dto';
import { IV1CitiesService } from './v1-cities-service.interface';

@Controller({
  path: ['cities'],
  version: '1',
})
export class V1CitiesController {
  constructor(
    @Inject(IV1CitiesService) private readonly citiesService: IV1CitiesService,
  ) {}

  @Get()
  @SerializeOptions({
    type: CitiesFindAllResponseDto,
  })
  findAll(): Promise<CitiesFindAllResponseDto[]> {
    return this.citiesService.findAll();
  }
}
