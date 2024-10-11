import { Injectable } from '@nestjs/common';
import { BrandsFindAllResponseDto } from './dto';
import { IV2BrandsService } from './v2-brands-service.interface';

@Injectable()
export class V2BrandsService implements IV2BrandsService {
  async findAll(): Promise<BrandsFindAllResponseDto[]> {
    return [];
  }
}
