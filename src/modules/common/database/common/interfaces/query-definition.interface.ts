export interface QueryDefinition<T = unknown> {
  (params: T): string;
}
