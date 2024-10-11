import { DynamicModule, Module, Type } from '@nestjs/common';
import { S3Module } from '../../s3';
import { ReportModule } from '../report.module';
import { REPORT_BUILDER_OPTIONS } from './report-builder.constants';
import { ReportBuilderService } from './report-builder.service';

@Module({})
export class ReportBuilderModule {
  static forFeature<T>(
    module: Type<T>,
    builders: Type<ReportBuilderService>[],
  ): DynamicModule {
    return {
      module: ReportBuilderModule,
      imports: [S3Module.register({} as any), ReportModule],
      providers: [
        {
          provide: REPORT_BUILDER_OPTIONS,
          useValue: {},
        },
        ...builders,
      ],
      exports: builders,
    };
  }
}
