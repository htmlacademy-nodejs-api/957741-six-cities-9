import { ContainerModule } from 'inversify';

import { COMPONENT_MAP } from '../../types/index.js';
import { Controller, AuthController } from '../../libs/rest/index.js';
import { AuthService, DefaultAuthService } from './index.js';

export function createAuthContainer() {
  return new ContainerModule(({ bind }) => {
    bind<AuthService>(COMPONENT_MAP.AUTH_SERVICE).to(DefaultAuthService).inSingletonScope();
    bind<Controller>(COMPONENT_MAP.AUTH_CONTROLLER).to(AuthController).inSingletonScope();
  });
}
