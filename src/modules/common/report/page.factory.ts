import { Logger } from '@nestjs/common';
import { ReportMarkup, ReportValue } from './interfaces';
import { ReportPageData } from './worker';

/**
 * Фабрика страницы выгрузки
 */
export abstract class PageFactory<TData, TParams> {
  constructor(protected readonly logger: Logger) {}

  /**
   * Разметка страницы выгрузки
   */
  protected abstract markup(): ReportMarkup;

  /**
   * Название страницы выгрузки
   */
  protected abstract name(params: TParams): string;

  /**
   * Заполнение данными страницы выгрузки
   */
  protected abstract value(data: TData, params: TParams): ReportValue[][];

  /**
   * Создание страницы выгрузки
   */
  build(data: TData, params: TParams): ReportPageData {
    return {
      markup: this.markup(),
      name: this.name(params),
      value: this.value(data, params),
    };
  }
}
