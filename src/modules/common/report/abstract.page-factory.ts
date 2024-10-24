import { Logger } from '@nestjs/common';
import { ReportMarkup, ReportValue } from './interfaces';
import { ReportPageData } from './worker';

export abstract class PageFactory<TData> {
  constructor(protected readonly logger: Logger) {}

  /**
   * Разметка страницы выгрузки.
   */
  protected abstract markup(): ReportMarkup;

  /**
   * Название страницы выгрузки.
   */
  protected abstract name(): string;

  /**
   * Заполнение страницы выгрузки данными.
   * @param {TData} data Данные.
   */
  protected abstract value(data: TData): ReportValue[][];

  /**
   * Создание страницу выгрузки.
   * @param {TData} data Данные.
   * @returns {ReportPageData} Данные страницы.
   */
  build(data: TData): ReportPageData {
    return {
      markup: this.markup(),
      name: this.name(),
      value: this.value(data),
    };
  }
}
