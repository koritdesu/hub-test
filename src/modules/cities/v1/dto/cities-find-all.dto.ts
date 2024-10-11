import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CitiesFindAllResponseDto {
  @Expose()
  id: number;
}
