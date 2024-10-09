import { Module, ModuleMetadata } from '@nestjs/common';

export const createDynamicModule = (metadata: ModuleMetadata) => {
  return class {
    static register() {
      const module = Object.defineProperty(class {}, 'name', {
        value: this.name,
      });

      Module(metadata)(module);

      return module;
    }
  };
};
