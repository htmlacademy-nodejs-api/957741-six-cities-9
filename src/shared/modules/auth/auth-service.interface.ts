import { DocumentType } from '@typegoose/typegoose';

import { Nullable } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';
import { LoginUserDto } from './index.js';

export interface AuthService {
  login(dto: LoginUserDto): Promise<void>;
  status(): Promise<Nullable<DocumentType<UserEntity>>>;
}
