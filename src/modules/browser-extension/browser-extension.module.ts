import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CategoriesModule } from '../categories';

const children = [CategoriesModule.register()];

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
