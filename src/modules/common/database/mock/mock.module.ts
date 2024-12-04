import { createDatabaseModule } from '../common';

export class MockModule extends createDatabaseModule(() => ({
  async query<T>(): Promise<T> {
    throw new Error('Method not implemented.');
  },
})) {}
