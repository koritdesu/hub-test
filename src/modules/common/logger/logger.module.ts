import { DynamicModule, Module, Type } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({})
export class LoggerModule {
  static forFeature(module: Type, name = module.name): DynamicModule {
    return {
      module,
      providers: [
        {
          provide: LoggerService,
          useFactory: () => new LoggerService(name),
        },
      ],
      exports: [LoggerService],
    };
  }
}
