import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  time = console.time;
  timeEnd = console.timeEnd;
}
