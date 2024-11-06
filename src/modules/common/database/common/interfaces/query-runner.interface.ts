import { ConnectionParams } from './connection-params.interface';

export interface QueryRunner<P> {
  run<T>(params: ConnectionParams<P>): Promise<T>;
}
