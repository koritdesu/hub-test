import { Readable } from 'node:stream';

export interface Report {
  name: string;
  data: Buffer | Readable;
}
