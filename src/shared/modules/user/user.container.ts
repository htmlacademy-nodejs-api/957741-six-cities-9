import { ContainerModule } from 'inversify';

import { COMPONENT_MAP } from '../../types/index.js';
import { DefaultUserService } from './default-user.service.js';
import { RestApplication } from '../../../rest/rest.application.js';

export function createUserContainer() {
  return new ContainerModule(({ bind }) => {
    bind<RestApplication>(COMPONENT_MAP.USER_SERVICE).to(DefaultUserService).inSingletonScope();
  });
}
