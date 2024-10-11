import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CategoriesModule, ICategoriesService } from '../categories';
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
