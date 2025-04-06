import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsIn, IsUrl } from 'class-validator';
import { UserType } from '../../../types/user.type.js';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsUrl()
  public avatarUrl?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  public name: string;

  @IsIn(['standard', 'pro'])
  public userType: UserType;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  public password: string;
}
