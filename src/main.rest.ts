import 'reflect-metadata';
import { Container } from 'inversify';

import { RestApplication } from './rest/index.js';
import { COMPONENT_MAP } from './shared/types/index.js';
import { createRestApplicationModule } from './rest/rest.container.js';

async function bootstrap() {
  const appContainer = new Container();

  appContainer.load(
    createRestApplicationModule(),
  );

  const application = appContainer.get<RestApplication>(COMPONENT_MAP.REST_APPLICATION);
  application.init();
}

bootstrap();
