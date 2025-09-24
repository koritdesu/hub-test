import { Logger, Type } from '@nestjs/common';
import { Report, ReportParams } from './interfaces';
import { PageFactory } from './page.factory';
import { ReportService } from './report.service';

export abstract class ReportFactory<
  TParams extends ReportParams = ReportParams,
  TData = unknown,
> {
  constructor(
    protected readonly logger: Logger,
    private readonly reportService: ReportService,
  ) {}

  /**
   * Название файла выгрузки
   */
  protected abstract name(params: TParams): string;

  /**
   * Массив фабрик страниц выгрузки
   */
  protected abstract pages(): Type<PageFactory<TData, TParams>>[];

  /**
   * Создание выгрузки
   */
  async build(params: TParams, data: TData): Promise<Report> {
    const [name, pages] = await Promise.all([
      this.name(params),
      this.pages().map((pageFactory) => {
        return new pageFactory(this.logger).build(data, params);
      }),
    ]);

    const report = await this.reportService.build({
      type: params.type,
      pages,
    });

    return {
      data: report,
      name,
    };
  }
}
