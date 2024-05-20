import { ClassConstructor } from 'class-transformer';

export interface ConnectionParams<P, T> {
  params: P;
  mapper?: ClassConstructor<T>;
}
