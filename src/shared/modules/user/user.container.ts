import { ContainerModule } from 'inversify';
import { types } from '@typegoose/typegoose';

import { COMPONENT_MAP } from '../../types/index.js';
import { UserEntity, UserModel, UserService, DefaultUserService } from './index.js';
import { Controller, UserController } from '../../libs/rest/index.js';

export function createUserContainer() {
  return new ContainerModule(({ bind }) => {
    bind<UserService>(COMPONENT_MAP.USER_SERVICE).to(DefaultUserService).inSingletonScope();
    bind<types.ModelType<UserEntity>>(COMPONENT_MAP.USER_MODEL).toConstantValue(UserModel);
    bind<Controller>(COMPONENT_MAP.USER_CONTROLLER).to(UserController).inSingletonScope();
  });
}
