import { User, UserType } from '../../types/index.js';

export class UserEntity implements User {
  public name: string;
  public email: string;
  public avatar: string;
  public password: string;
  public userType: UserType;
}
