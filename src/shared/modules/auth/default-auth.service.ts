import { inject, injectable } from 'inversify';
import { DocumentType } from '@typegoose/typegoose';
import { createSecretKey } from 'node:crypto';

import { Logger } from '../../libs/logger/index.js';
import { COMPONENT_MAP } from '../../types/index.js';

import { Nullable } from '../../types/index.js';
import { UserService } from '../user/user-service.interface.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { UserEntity } from '../user/user.entity.js';
import { AuthService } from './auth-service.interface.js';
import { Config } from 'convict';
import { RestSchema } from '../../libs/config/rest.schema.type.js';
import { SignJWT } from 'jose';
import { TokenPayload } from './types.js';
import { UserNotFoundOrPasswordIncorrectException } from './errors/index.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.USER_SERVICE) private readonly userService: UserService,
    @inject(COMPONENT_MAP.CONFIG) private readonly config: Config<RestSchema>
  ) { }

  public async authenticate(user: DocumentType<UserEntity>): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      email: user.email,
      id: user._id.toString(),
    };

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: this.config.get('JWT_ALGORITHM') })
      .setIssuedAt()
      .setExpirationTime(this.config.get('JWT_EXPIRED'))
      .sign(secretKey);
  }

  public async login(dto: LoginUserDto): Promise<DocumentType<UserEntity>> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !user.verifyPassword(dto.password, this.config.get('SALT'))) {
      if (!user) {
        this.logger.warn(`User with ${dto.email} not found`);
      } else {
        this.logger.warn(`Incorrect password for ${dto.email}`);
      }
      throw new UserNotFoundOrPasswordIncorrectException();
    }

    return user;
  }

  public async status(id: string): Promise<Nullable<DocumentType<UserEntity>>> {
    return this.userService.findById(id);
  }
}
