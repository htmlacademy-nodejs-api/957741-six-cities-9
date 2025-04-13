import { IsNotEmpty, IsEmail, IsString, IsEnum, Length } from 'class-validator';
import { UserType } from '../../../types/user.type.js';
import { USER_VALIDATION } from './const.js';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

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
