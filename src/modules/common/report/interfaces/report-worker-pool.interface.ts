import { IWorkerPool } from '../../worker-pool';
import { ReportData } from '../worker';

export interface IReportWorkerPool extends IWorkerPool<ReportData, Buffer> {}
