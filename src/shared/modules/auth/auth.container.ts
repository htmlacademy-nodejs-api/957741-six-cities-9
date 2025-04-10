import { ContainerModule } from 'inversify';

import { COMPONENT_MAP } from '../../types/index.js';
import { Controller, AuthController, ExceptionFilter } from '../../libs/rest/index.js';
import { AuthService, DefaultAuthService } from './index.js';
import { AuthExceptionFilter } from './auth.exception-filter.js';

export function createAuthContainer() {
  return new ContainerModule(({ bind }) => {
    bind<AuthService>(COMPONENT_MAP.AUTH_SERVICE).to(DefaultAuthService).inSingletonScope();
    bind<Controller>(COMPONENT_MAP.AUTH_CONTROLLER).to(AuthController).inSingletonScope();
    bind<ExceptionFilter>(COMPONENT_MAP.EXCEPTION_FILTER).to(AuthExceptionFilter).inSingletonScope();
  });
}
