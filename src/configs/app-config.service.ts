import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAIConfig } from 'src/modules/common/openai';
import { S3Config } from 'src/modules/common/s3';
import { AppConfig } from './types';

@Injectable()
export class AppConfigService
  implements
    AppConfig<
      [
        { name: 'port'; type: number },
        { name: 'chFast'; type: unknown },
        { name: 'chMid'; type: unknown },
        { name: 'chSlow'; type: unknown },
        { name: 's3'; type: S3Config },
        { name: 'openai'; type: OpenAIConfig },
      ]
    >
{
  readonly port = this.configService.getOrThrow<number>('PORT');

  readonly chFast: unknown;

  readonly chMid: unknown;

  readonly chSlow: unknown;

  readonly s3: S3Config = {
    accessKey: this.configService.getOrThrow<string>('S3_ACCESS_KEY'),
    endPoint: this.configService.getOrThrow<string>('S3_URL'),
    secretKey: this.configService.getOrThrow<string>('S3_SECRET_KEY'),
  };

  readonly openai: OpenAIConfig = {
    apiKey: this.configService.getOrThrow<string>('OPENAI_API_KEY'),
    model: this.configService.getOrThrow<string>('OPENAI_MODEL'),
    proxyUrl: this.configService.getOrThrow<string>('OPENAI_PROXY_URL'),
  };

  constructor(private readonly configService: ConfigService) {}
}
