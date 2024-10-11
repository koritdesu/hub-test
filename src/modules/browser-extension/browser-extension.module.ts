import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CategoriesModule } from '../categories';
import { ICategoriesService } from '../categories/v1';
import { V1CategoriesService } from './categories';

const children = [
  CategoriesModule.register({
    providers: [
      {
        provide: ICategoriesService,
        useClass: V1CategoriesService,
      },
    ],
  }),
];

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
