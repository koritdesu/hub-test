import { CitiesFindAllResponseDto } from './dto';

export const IV1CitiesService = Symbol('CitiesService');

export interface IV1CitiesService {
  findAll(): Promise<CitiesFindAllResponseDto[]>;
}
