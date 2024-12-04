import { Type } from '@nestjs/common';
import {
  PageFactory,
  ReportFactory,
  ReportMarkup,
  ReportParams,
  ReportValue,
} from '../common/report';
import { CategoryService } from './category.service';

interface CategoryReportParams
  extends ReportParams<Parameters<CategoryService['findAll']>> {}

interface CategoryReportData
  extends Awaited<ReturnType<CategoryService['findAll']>> {}

export class CategoryReport extends ReportFactory<
  CategoryReportParams,
  CategoryReportData
> {
  protected async data(
    params: CategoryReportParams,
  ): Promise<CategoryReportData> {
    const categoryService: CategoryService = this.discoveryService
      .getProviders()
      .find((wrapper) => wrapper.instance instanceof CategoryService)?.instance;

    return categoryService.findAll(...params.args);
  }

  protected async name(): Promise<string> {
    return 'Категории';
  }

  protected pages(): Type<
    PageFactory<CategoryReportData, CategoryReportParams>
  >[] {
    return [CategoryPage];
  }
}

class CategoryPage extends PageFactory<
  CategoryReportData,
  CategoryReportParams
> {
  protected markup(): ReportMarkup {
    return {
      cols: [],
      rows: [],
    };
  }

  protected name(): string {
    return 'Категории';
  }

  protected value(data: CategoryReportData): ReportValue[][] {
    return [['ID']].concat(
      data.map((item) => {
        return [item.id];
      }),
    );
  }
}
