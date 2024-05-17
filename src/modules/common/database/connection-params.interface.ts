import { ClassConstructor } from 'class-transformer';

export interface ConnectionParams<T> {
  type?: ClassConstructor<T>;
}
