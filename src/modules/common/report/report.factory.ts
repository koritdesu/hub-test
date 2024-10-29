import { Logger, Type } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Cache } from '../cache/shared';
import { Report, ReportParams } from './interfaces';
import { PageFactory } from './page.factory';
import { ReportService } from './report.service';

export abstract class ReportFactory<
  TParams extends ReportParams = ReportParams,
  TData = unknown,
> {
  constructor(
    protected readonly logger: Logger,
    protected readonly cache: Cache,
    private readonly reportService: ReportService,
  ) {}

  /**
   * Получение данных выгрузки
   */
  protected abstract data(params: TParams): Promise<TData>;

  /**
   * Название файла выгрузки
   */
  protected abstract name(params: TParams): string;

  /**
   * Массив фабрик страниц выгрузки
   */
  protected abstract pages(): Type<PageFactory<TData>>[];

  /**
   * Создание выгрузки
   */
  async build(params: TParams): Promise<Report> {
    const name = this.name(params);
    const key = this.cacheKey(params.cache?.key);

    const cachedReport = await this.cache
      .get(key)
      .catch(this.logger.warn.bind(this.logger));

    if (cachedReport) {
      return {
        data: cachedReport.stream(),
        name,
      };
    }

    const data = await this.data(params);
    const pages = this.pages().map((pageFactory) => {
      return new pageFactory(this.logger).build(data);
    });

    const report = await this.reportService.build({
      type: params.type,
      pages,
    });

    this.cache.set(key, report).catch(this.logger.warn.bind(this.logger));

    return {
      data: report,
      name,
    };
  }

  private cacheKey(key: string = randomUUID()): string {
    return key;
  }
}
