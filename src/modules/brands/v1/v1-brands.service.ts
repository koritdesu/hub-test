import { GoneException, Injectable } from '@nestjs/common';
import { BrandsFindAllResponseDto } from './dto';
import { IV1BrandsService } from './v1-brands-service.interface';

@Injectable()
export class V1BrandsService implements IV1BrandsService {
  findAll(): Promise<BrandsFindAllResponseDto[]> {
    throw new GoneException();
  }
}
