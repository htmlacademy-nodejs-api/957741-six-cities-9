import { UserType } from '../../../types/user.type.js';

export class CreateUserDto {
  public email: string;
  public avatar: string;
  public name: string;
  public userType: UserType;
  public password: string;
}
