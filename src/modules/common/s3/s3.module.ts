import { DynamicModule, Module } from '@nestjs/common';
import { Client } from 'minio';
import { S3Config } from './interfaces';
import { S3Service } from './s3.service';

@Module({})
export class S3Module {
  static register(config: S3Config): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: S3Service,
          useValue: new Client(config),
        },
      ],
      exports: [S3Service],
    };
  }
}
