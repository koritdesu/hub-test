import { Module } from '@nestjs/common';
import { V1CategoriesModule } from './v1';

@Module({
  imports: [V1CategoriesModule],
})
export class CategoriesModule {}
