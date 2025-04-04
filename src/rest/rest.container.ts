import { ContainerModule } from 'inversify';

import { RestApplication } from './rest.application.js';
import { COMPONENT_MAP } from '../shared/types/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import { ExceptionFilter, AppExceptionFilter } from '../shared/libs/rest/index.js';

export function createRestApplicationContainer() {
  return new ContainerModule(({ bind }) => {
    bind<RestApplication>(COMPONENT_MAP.REST_APPLICATION).to(RestApplication).inSingletonScope();
    bind<Logger>(COMPONENT_MAP.LOGGER).to(PinoLogger).inSingletonScope();
    bind<Config<RestSchema>>(COMPONENT_MAP.CONFIG).to(RestConfig).inSingletonScope();
    bind<DatabaseClient>(COMPONENT_MAP.DATABESE_CLIENT).to(MongoDatabaseClient).inSingletonScope();
    bind<ExceptionFilter>(COMPONENT_MAP.EXCEPTION_FILTER).to(AppExceptionFilter).inSingletonScope();
  });
}
