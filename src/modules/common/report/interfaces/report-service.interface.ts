import { ReportData } from '../worker';

export interface IReportService {
  build(data: ReportData): Promise<Buffer>;
}
