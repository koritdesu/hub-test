import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { REPORT_WORKER_POOL } from './constants';
import { ReportWorkerPool } from './worker';

@Global()
@Module({})
export class ReportCoreModule {
  static forRoot(size?: number): DynamicModule {
    const workerPool: Provider = {
      provide: REPORT_WORKER_POOL,
      useValue: new ReportWorkerPool(size),
    };

    return {
      module: ReportCoreModule,
      providers: [workerPool],
      exports: [workerPool],
    };
  }
}
