import { IsNotEmpty, IsEmail, IsString, IsUrl, IsEnum, Length, IsOptional } from 'class-validator';
import { UserType } from '../../../types/user.type.js';
import { USER_VALIDATION } from './const.js';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  public avatarUrl?: string;

  @IsNotEmpty()
  @IsString()
  @Length(USER_VALIDATION.NAME.MIN_LENGTH, USER_VALIDATION.NAME.MAX_LENGTH)
  public name: string;

  @IsEnum(UserType)
  public userType: UserType;

  @IsNotEmpty()
  @IsString()
  @Length(USER_VALIDATION.PASSWORD.MIN_LENGTH, USER_VALIDATION.PASSWORD.MAX_LENGTH)
  public password: string;
}
