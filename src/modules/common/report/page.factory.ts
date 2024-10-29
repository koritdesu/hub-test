import { Logger } from '@nestjs/common';
import { ReportMarkup, ReportValue } from './interfaces';
import { ReportPageData } from './worker';

/**
 * Фабрика страницы выгрузки
 */
export abstract class PageFactory<TData> {
  constructor(protected readonly logger: Logger) {}

  /**
   * Разметка страницы выгрузки
   */
  protected abstract markup(): ReportMarkup;

  /**
   * Название страницы выгрузки
   */
  protected abstract name(): string;

  /**
   * Заполнение данными страницы выгрузки
   */
  protected abstract value(data: TData): ReportValue[][];

  /**
   * Создание страницы выгрузки
   */
  build(data: TData): ReportPageData {
    return {
      markup: this.markup(),
      name: this.name(),
      value: this.value(data),
    };
  }
}
