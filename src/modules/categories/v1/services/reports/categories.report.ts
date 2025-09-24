import { Type } from '@nestjs/common';
import {
  PageFactory,
  ReportFactory,
  ReportMarkup,
  ReportParams,
  ReportValue,
} from '../../../../common/report';
import { CategoriesService } from '../categories.service';

interface CategoriesReportParams
  extends ReportParams<Parameters<CategoriesService['categories']>> {}

interface CategoriesReportData
  extends Awaited<ReturnType<CategoriesService['categories']>> {}

export class CategoriesReport extends ReportFactory<
  CategoriesReportParams,
  CategoriesReportData
> {
  protected name(): string {
    return 'Категории';
  }

  protected pages(): Type<
    PageFactory<CategoriesReportData, CategoriesReportParams>
  >[] {
    return [CategoriesPage];
  }
}

class CategoriesPage extends PageFactory<
  CategoriesReportData,
  CategoriesReportParams
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

  protected value(data: CategoriesReportData): ReportValue[][] {
    return [['ID']].concat(
      data.map((item) => {
        return [item.id];
      }),
    );
  }
}
