import { BrandsFindAllResponseDto } from './dto';

export const IV1BrandsService = Symbol('BrandsService');

export interface IV1BrandsService {
  findAll(): Promise<BrandsFindAllResponseDto[]>;
}
