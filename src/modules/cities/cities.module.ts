import { createDynamicModule } from '../common/module';
import { IV1CitiesService, V1CitiesController, V1CitiesService } from './v1';

export class CitiesModule extends createDynamicModule({
  controllers: [V1CitiesController],
  providers: [
    {
      provide: IV1CitiesService,
      useClass: V1CitiesService,
    },
  ],
}) {}
