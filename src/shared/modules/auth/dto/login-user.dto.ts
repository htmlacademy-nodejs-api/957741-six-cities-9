import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';
import { AUTH_VALIDATION } from './const.js';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(AUTH_VALIDATION.PASSWORD.MIN_LENGTH, AUTH_VALIDATION.PASSWORD.MAX_LENGTH)
  public password: string;
}
