import { Module, ModuleMetadata } from '@nestjs/common';
import { merge } from 'lodash';
import { randomUUID } from 'node:crypto';

export const createDynamicModule = (defaultMetadata: ModuleMetadata) => {
  return class {
    static register(metadata: ModuleMetadata = {}) {
      const module = Object.defineProperty(class {}, 'name', {
        value: `${this.name}:${randomUUID()}`,
      });

      Module(merge({}, defaultMetadata, metadata))(module);

      return module;
    }
  };
};
