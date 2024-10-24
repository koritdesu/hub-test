/* eslint-disable @typescript-eslint/no-unused-vars */

import { isMainThread, parentPort } from 'node:worker_threads';
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
  // const wb = xlsx.utils.book_new();
  // for (const { name, value, markup } of message.data.pages) {
  //   const ws = xlsx.utils.aoa_to_sheet(value);
  //   ws['!cols'] = markup.cols;
  //   ws['!rows'] = markup.rows;
  //   xlsx.utils.book_append_sheet(wb, ws, name);
  // }
  // const options: xlsx.WritingOptions = {
  //   type: 'array',
  //   bookType: message.data.ext,
  // };
  // if (message.data.ext === ReportExtension.CSV) {
  //   options.FS = ';';
  //   options.codepage = 1251;
  // }
  // message.producer.postMessage(xlsx.write(wb, options));
};

if (!isMainThread) {
  parentPort?.on('message', onMessage);
}
