import { IsString, IsUrl, IsOptional, IsEnum, Length } from 'class-validator';
import { UserType } from '../../../types/index.js';
import { USER_VALIDATION } from './const.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(USER_VALIDATION.NAME.MAX_LENGTH, USER_VALIDATION.NAME.MAX_LENGTH)
  public name?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  public avatarUrl?: string;

  @IsOptional()
  @IsEnum(UserType)
  public type?: UserType;
}
