import { BrandsFindAllResponseDto } from './dto';

export const IV2BrandsService = Symbol('BrandsService');

export interface IV2BrandsService {
  findAll(): Promise<BrandsFindAllResponseDto[]>;
}
