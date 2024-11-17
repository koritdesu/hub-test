import { Module, Type } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

const children: Type[] = [];

@Module({
  imports: [
    ...children,
    RouterModule.register([
      {
        path: 'browser-extension',
        children,
      },
    ]),
  ],
})
export class BrowserExtensionModule {}
