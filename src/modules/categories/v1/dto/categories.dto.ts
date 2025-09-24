import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { ReportType } from '../../../common/report';

@Exclude()
export class CategoriesRequestDto {
  @Expose()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip = 0;

  @Expose()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  take = 100;
}

@Exclude()
export class CategoriesReportRequestDto extends CategoriesRequestDto {
  @Expose()
  @IsEnum(ReportType)
  type: ReportType;
}

@Exclude()
export class CategoryResponseDto {
  @Expose()
  id: string;
}
