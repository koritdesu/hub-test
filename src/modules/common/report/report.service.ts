import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { IReportService, IReportWorkerPool } from './interfaces';
import { REPORT_WORKER_POOL } from './report.constants';
import { ReportData } from './worker';

@Injectable()
export class ReportService implements IReportService, OnModuleDestroy {
  constructor(
    @Inject(REPORT_WORKER_POOL) private readonly workerPool: IReportWorkerPool,
  ) {}

  build(data: ReportData): Promise<Buffer> {
    return this.workerPool.process(data);
  }

  onModuleDestroy(): void {
    this.workerPool.terminate();
  }
}
