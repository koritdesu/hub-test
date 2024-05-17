import { Exclude, Expose } from 'class-transformer';

export interface CategoriesFindAllParams {
  categoryId: number;
  segments: number;
  dateStart: string;
  dateEnd: string;
  priceStart: number;
  priceEnd: number;
}

@Exclude()
export class CategoriesFindAllResult {
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
