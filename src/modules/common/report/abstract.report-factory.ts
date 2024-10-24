import { Logger, Type } from '@nestjs/common';
import { Cache } from '../cache/shared';
import { PageFactory } from './abstract.page-factory';
import { ReportType } from './enums';
import { Report } from './interfaces';
import { ReportService } from './report.service';

export abstract class ReportFactory<
  TParams extends {
    type: ReportType;
  },
  TData,
> {
  constructor(
    protected readonly logger: Logger,
    protected readonly cache: Cache,
    private readonly reportService: ReportService,
  ) {}

  /**
   * Получение данных для выгрузки.
   * @param {TParams} params Параметры
   */
  protected abstract data(params: TParams): Promise<TData>;

  /**
   * Название файла выгрузки.
   * @param {TParams} params Параметры
   */
  protected abstract name(params: TParams): string;

  /**
   * Массив с реализацией страниц текущей выгрузки.
   */
  protected abstract pages(): Type<PageFactory<TData>>[];

  /**
   * Создание выгрузки или чтение ее из кэша.
   * @param {TParams} params Параметры
   * @returns {Report} Выгрузка
   */
  async build(params: TParams): Promise<Report> {
    // TODO: кэширование и логирование

    const data = await this.data(params);
    const name = this.name(params);
    const pages = this.pages().map((pageFactory) => {
      return new pageFactory(this.logger).build(data);
    });

    const report = await this.reportService.build({
      type: params.type,
      pages,
    });

    return {
      name,
      buffer: report,
    };
  }
}
