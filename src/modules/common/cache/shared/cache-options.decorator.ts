import { Reflector } from '@nestjs/core';
import { CacheStrategy } from './interfaces';

export const CacheOptions = Reflector.createDecorator<{
  strategies: CacheStrategy[];
}>();
