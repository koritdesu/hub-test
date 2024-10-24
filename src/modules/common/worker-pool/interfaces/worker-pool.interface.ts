export interface IWorkerPool<TData, TResult> {
  process(data: TData): Promise<TResult>;

  terminate(): Promise<void>;
}
