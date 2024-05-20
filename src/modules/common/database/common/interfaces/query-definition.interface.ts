export interface QueryDefinition<T = any> {
  (params: T): string;
}
