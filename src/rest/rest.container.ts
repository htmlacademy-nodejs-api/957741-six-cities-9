import { ContainerModule } from 'inversify';

import { RestApplication } from './rest.application.js';
import { COMPONENT_MAP } from '../shared/types/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';

export function createRestApplicationModule() {
  return new ContainerModule(({ bind }) => {
    bind<RestApplication>(COMPONENT_MAP.REST_APPLICATION).to(RestApplication).inSingletonScope();
    bind<Logger>(COMPONENT_MAP.LOGGER).to(PinoLogger).inSingletonScope();
    bind<Config<RestSchema>>(COMPONENT_MAP.CONFIG).to(RestConfig).inSingletonScope();
    bind<DatabaseClient>(COMPONENT_MAP.DATABESE_CLIENT).to(MongoDatabaseClient).inSingletonScope();
  });
}
