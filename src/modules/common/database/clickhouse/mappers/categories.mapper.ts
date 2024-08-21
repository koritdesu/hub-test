import { Exclude, Expose } from 'class-transformer';
import { TransformToPositiveIntOrNull } from 'src/modules/common/serialization';
import { CategoriesFindAllEntity } from '../entities';

@Exclude()
export class CategoriesFindAllMapper implements CategoriesFindAllEntity {
  @Expose()
  @TransformToPositiveIntOrNull()
  articlesCount: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  articlesWithRevenueCount: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  articlesWithRevenuePct: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  newArticlesCount: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  newArticlesPct: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  newArticlesWithRevenueCount: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  newArticlesWithRevenuePct: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  brandsCount: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  brandsWithRevenueCount: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  brandsWithRevenuePct: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  suppliersCount: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  suppliersWithRevenueCount: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  suppliersWithRevenuePct: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  revenueCount: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  revenue: number;

  @Expose()
  @TransformToPositiveIntOrNull()
  avgRevenueSumPerItem: number;
}
