import 'reflect-metadata';
import { Container } from 'inversify';

import { RestApplication } from './rest/index.js';
import { COMPONENT_MAP } from './shared/types/index.js';
import { createRestApplicationModule } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';
import { createCommentContainer } from './shared/modules/comment/index.js';

async function bootstrap() {
  const appContainer = new Container();

  appContainer.load(
    createRestApplicationModule(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
  );

  const application = appContainer.get<RestApplication>(COMPONENT_MAP.REST_APPLICATION);
  application.init();
}

bootstrap();
