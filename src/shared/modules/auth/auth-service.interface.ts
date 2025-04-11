import { DocumentType } from '@typegoose/typegoose';

import { Nullable } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';
import { LoginUserDto } from './index.js';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>;
  login(dto: LoginUserDto): Promise<DocumentType<UserEntity>>;
  status(id: string): Promise<Nullable<DocumentType<UserEntity>>>;
}
