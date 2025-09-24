import { Injectable } from '@nestjs/common';
import { Report } from '../../../common/report';
import { CategoriesReportRequestDto } from '../dto';
import { CategoriesService } from './categories.service';
import { CategoriesReport } from './reports';

@Injectable()
export class CategoriesReportService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly categoriesReport: CategoriesReport,
  ) {}

  async buildCategoriesReport(
    dto: CategoriesReportRequestDto,
  ): Promise<Report> {
    const data = await this.categoriesService.categories(dto);

    return this.categoriesReport.build(
      {
        args: [dto],
        type: dto.type,
      },
      data,
    );
  }
}
