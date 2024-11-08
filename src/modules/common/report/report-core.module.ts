import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { REPORT_WORKER_POOL } from './report.constants';
import { ReportWorkerPool } from './worker';

@Global()
@Module({})
export class ReportCoreModule {
  static forRoot(threads?: number): DynamicModule {
    const workerPool: Provider = {
      provide: REPORT_WORKER_POOL,
      useValue: new ReportWorkerPool(threads),
    };

    return {
      module: ReportCoreModule,
      providers: [workerPool],
      exports: [workerPool],
    };
  }
}
