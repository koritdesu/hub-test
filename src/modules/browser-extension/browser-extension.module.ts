import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { BrandsModule } from '../brands';
import { CategoriesModule, IV1CategoriesService } from '../categories';
import { CitiesModule } from '../cities';
import { V1CategoriesService } from './categories';

const children = [
  BrandsModule.register(),
  CategoriesModule.register({
    providers: [
      {
        provide: IV1CategoriesService,
        useClass: V1CategoriesService,
      },
    ],
  }),
  CitiesModule.register(),
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
