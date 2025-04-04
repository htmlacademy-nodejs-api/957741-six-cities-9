import { inject, injectable } from 'inversify';
import { DocumentType } from '@typegoose/typegoose';

import { Logger } from '../../libs/logger/index.js';
import { COMPONENT_MAP } from '../../types/index.js';

import { Nullable } from '../../types/index.js';
import { UserService } from '../user/user-service.interface.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { UserEntity } from '../user/user.entity.js';
import { AuthService } from './auth-service.interface.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.USER_SERVICE) private readonly userService: UserService
  ) { }

  public async login(dto: LoginUserDto): Promise<void> {
    // 200 Аутентификация успешна, токен выдан
    // 401 Неверный логин или пароль
    this.logger.info(`User logged in successfully: ${dto.email}`);
  }

  public async status(): Promise<Nullable<DocumentType<UserEntity>>> {
    // 200 Пользователь авторизован
    // 401 Пользователь не авторизован
    const user = this.userService.findByEmail('email');
    return user;
  }
}
