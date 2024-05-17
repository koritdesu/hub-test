import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';

@Exclude()
export class CategoriesFindAllRequestDto {
  @Expose()
  @IsInt()
  @Min(1)
  categoryId: number;

  @Expose()
  @IsInt()
  @Min(1)
  segments: number;

  @Expose()
  @IsString()
  dateStart: string;

  @Expose()
  @IsString()
  dateEnd: string;

  @Expose()
  @IsInt()
  @Min(0)
  priceStart: number;

  @Expose()
  @IsInt()
  @Min(0)
  priceEnd: number;
}

@Exclude()
export class CategoriesFindAllResponseDto {
  @Expose()
  articlesCount: number;

  @Expose()
  articlesWithRevenueCount: number;

  @Expose()
  articlesWithRevenuePct: number;

  @Expose()
  newArticlesCount: number;

  @Expose()
  newArticlesPct: number;

  @Expose()
  newArticlesWithRevenueCount: number;

  @Expose()
  newArticlesWithRevenuePct: number;

  @Expose()
  brandsCount: number;

  @Expose()
  brandsWithRevenueCount: number;

  @Expose()
  brandsWithRevenuePct: number;

  @Expose()
  suppliersCount: number;

  @Expose()
  suppliersWithRevenueCount: number;

  @Expose()
  suppliersWithRevenuePct: number;

  @Expose()
  revenueCount: number;

  @Expose()
  revenue: number;

  @Expose()
  avgRevenueSumPerItem: number;
}
