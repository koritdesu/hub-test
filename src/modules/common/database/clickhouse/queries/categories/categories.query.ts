import { QueryDefinition } from '../../../common';

export const categoriesQuery: QueryDefinition<{
  skip: number;
  take: number;
}> = (params) => {
  return `--sql
SELECT
  ${params.skip} + n.number AS id
FROM numbers(${params.take}) n
FORMAT JSON;`;
};
