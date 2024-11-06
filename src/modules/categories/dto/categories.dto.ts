import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { ReportType } from '../../common/report';

@Exclude()
export class CategoriesFindAllRequestDto {
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
export class CategoriesFindAllResponseDto {
  @Expose()
  id: string;
}

@Exclude()
export class CategoriesReportRequestDto {
  @Expose()
  @IsEnum(ReportType)
  type: ReportType;
}
