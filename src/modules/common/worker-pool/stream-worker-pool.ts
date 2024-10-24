import { MessageChannel } from 'node:worker_threads';
import { StreamWorkerData } from './interfaces';
import { WorkerPool } from './worker-pool';

export class StreamWorkerPool<T> extends WorkerPool<T, Buffer> {
  process(data: T): Promise<Buffer> {
    const messageChannel = new MessageChannel();
    const consumer = messageChannel.port1;
    const producer = messageChannel.port2;

    const message: StreamWorkerData<T> = {
      data,
      producer,
    };

    this.worker.postMessage(message, [producer]);

    return new Promise((resolve, reject) => {
      consumer.on('message', resolve);
      consumer.on('messageerror', reject);
    });
  }
}
