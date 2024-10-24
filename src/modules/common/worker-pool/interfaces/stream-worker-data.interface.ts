import { MessagePort } from 'node:worker_threads';

export interface StreamWorkerData<TData> {
  data: TData;
  producer: MessagePort;
}
