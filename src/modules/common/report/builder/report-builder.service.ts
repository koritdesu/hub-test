import { Logger } from '@nestjs/common';
import { S3Service } from '../../s3';
import { ReportService } from '../report.service';

export abstract class ReportBuilderService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly s3Service: S3Service,
    private readonly reportService: ReportService,
  ) {}

  async getOrCreate(key: string): Promise<unknown> {
    const object = await this.s3Service
      .getObject('', key)
      .catch((error) => this.logger.error(error));

    if (object) {
      return object;
    }

    const report = await this.reportService.create();

    await this.s3Service.putObject('', key, JSON.stringify(report));
  }

  protected abstract fileName(): Promise<unknown>;

  protected abstract markup(): Promise<unknown>;

  protected abstract header(): Promise<unknown>;

  protected abstract value(): Promise<unknown>;
}
