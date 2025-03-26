import { DocumentType } from '@typegoose/typegoose';

import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';

import { Nullable } from '../../types/index.js';
import { OfferEntity } from '../offer/index.js';
import { UpdateUserDto } from './index.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<Nullable<DocumentType<UserEntity>>>;
  findById(userId: string): Promise<Nullable<DocumentType<UserEntity>>>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
  findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
  exists(userId: string): Promise<boolean>;
}
