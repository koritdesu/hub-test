import { RedisCacheModule } from '../common/cache/redis';
import { createDynamicModule } from '../common/module';
import { IV1BrandsService, V1BrandsController, V1BrandsService } from './v1';
import { IV2BrandsService, V2BrandsController, V2BrandsService } from './v2';

export class BrandsModule extends createDynamicModule({
  imports: [RedisCacheModule.register()],
  controllers: [V1BrandsController, V2BrandsController],
  providers: [
    {
      provide: IV1BrandsService,
      useClass: V1BrandsService,
    },
    {
      provide: IV2BrandsService,
      useClass: V2BrandsService,
    },
  ],
}) {}
