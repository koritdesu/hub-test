import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REPORT_WORKER_POOL } from './constants';
import { IReportService, IReportWorkerPool } from './interfaces';
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
