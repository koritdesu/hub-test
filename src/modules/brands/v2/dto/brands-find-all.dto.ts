import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BrandsFindAllResponseDto {
  @Expose()
  id: number;
}
