/* eslint-disable @typescript-eslint/no-explicit-any */

import { DynamicModule, Module, Type } from '@nestjs/common';
import { ReportCoreModule } from './report-core.module';
import { ReportFactory } from './report.factory';
import { ReportService } from './report.service';

@Module({})
export class ReportModule {
  static forRoot(threads?: number): DynamicModule {
    return {
      module: ReportModule,
      imports: [ReportCoreModule.forRoot(threads)],
    };
  }

  static forFeature(reports: Type<ReportFactory<any, any>>[]): DynamicModule {
    return {
      module: ReportModule,
      providers: [ReportService, ...reports],
      exports: reports,
    };
  }
}
