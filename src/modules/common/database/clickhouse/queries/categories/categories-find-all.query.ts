import { QueryDefinition } from '../../../common';
import { CategoriesFindAllParams } from '../../interfaces';

export const categoriesFindAllQuery: QueryDefinition<
  CategoriesFindAllParams
> = (params) => {
  const segments = Math.min(
    params.segments,
    Math.max(1, params.priceEnd - params.priceStart),
  );

  return `--sql
SELECT
  n.number AS priceGroup
  , 0 AS articlesCount
  , 0 AS articlesWithRevenueCount
  , 0 AS articlesWithRevenuePct
  , 0 AS newArticlesCount
  , 0 AS newArticlesPct
  , 0 AS newArticlesWithRevenueCount
  , 0 AS newArticlesWithRevenuePct
  , 0 AS brandsCount
  , 0 AS brandsWithRevenueCount
  , 0 AS brandsWithRevenuePct
  , 0 AS suppliersCount
  , 0 AS suppliersWithRevenueCount
  , 0 AS suppliersWithRevenuePct
  , 0 AS revenueCount
  , 0 AS revenue
  , 0 AS avgRevenueSumPerItem
FROM numbers(${segments}) n
FORMAT JSON;`;
};
