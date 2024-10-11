import { Injectable } from '@nestjs/common';
import { CitiesFindAllResponseDto } from './dto';
import { IV1CitiesService } from './v1-cities-service.interface';

@Injectable()
export class V1CitiesService implements IV1CitiesService {
  async findAll(): Promise<CitiesFindAllResponseDto[]> {
    return Array.from({ length: 10 }, (_, id) => ({
      id,
    }));
  }
}
