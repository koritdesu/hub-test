import { isMainThread, parentPort } from 'node:worker_threads';
import xlsx from 'xlsx';
import { StreamWorkerData } from '../../worker-pool';
import { ReportType } from '../enums';
import { ReportMarkup, ReportValue } from '../interfaces';

export interface ReportPageData {
  markup: ReportMarkup;
  name: string;
  value: ReportValue[][];
}

export interface ReportData {
  type: ReportType;
  pages: ReportPageData[];
}

const onMessage = (message: StreamWorkerData<ReportData>): void => {
  const wb = xlsx.utils.book_new();

  for (const { name, value, markup } of message.data.pages) {
    const ws = xlsx.utils.aoa_to_sheet(value, {
      cellStyles: true,
    });

    ws['!cols'] = markup.cols;
    ws['!rows'] = markup.rows;

    xlsx.utils.book_append_sheet(wb, ws, name);
  }

  const options: xlsx.WritingOptions = {
    type: 'array',
    bookType: message.data.type,
  };

  message.producer.postMessage(xlsx.write(wb, options));
};

if (!isMainThread) {
  parentPort?.on('message', onMessage);
}
