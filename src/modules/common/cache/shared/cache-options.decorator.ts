import { Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CacheStrategy } from './interfaces';

export const CacheOptions = Reflector.createDecorator<{
  strategies: Type<CacheStrategy>[];
}>();
