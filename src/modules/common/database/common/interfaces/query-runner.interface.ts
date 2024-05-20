import { ConnectionParams } from './connection-params.interface';

export interface QueryRunner<P> {
  run<T>(params: ConnectionParams<P, unknown>): Promise<T>;
  run<T>(params: ConnectionParams<P, T>): Promise<T>;
}
