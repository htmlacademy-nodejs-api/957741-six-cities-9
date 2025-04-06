import { IsString, MinLength, MaxLength, IsUrl, IsIn } from 'class-validator';
import { UserType } from '../../../types/index.js';

export class UpdateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  public name?: string;

  @IsString()
  @IsUrl()
  public avatarUrl?: string;

  @IsIn(['standard', 'pro'])
  public type?: UserType;
}
