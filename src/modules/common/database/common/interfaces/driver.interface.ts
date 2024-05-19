export interface Driver {
  query<T = unknown>(query: string): Promise<T>;
}
