export interface CategoriesFindAllParams {
  categoryId: number;
  segments: number;
  dateStart: string;
  dateEnd: string;
  priceStart: number;
  priceEnd: number;
}

export interface CategoriesFindAllResult {
  articlesCount: number;
  articlesWithRevenueCount: number;
  articlesWithRevenuePct: number;
  newArticlesCount: number;
  newArticlesPct: number;
  newArticlesWithRevenueCount: number;
  newArticlesWithRevenuePct: number;
  brandsCount: number;
  brandsWithRevenueCount: number;
  brandsWithRevenuePct: number;
  suppliersCount: number;
  suppliersWithRevenueCount: number;
  suppliersWithRevenuePct: number;
  revenueCount: number;
  revenue: number;
  avgRevenueSumPerItem: number;
}
