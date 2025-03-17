import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';

import { User, UserType } from '../../types/index.js';

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop()
  public name: string;

  @prop({ unique: true })
  public email: string;

  @prop()
  public avatar: string;

  @prop()
  public password: string;

  @prop()
  public userType: UserType;
}

export const UserModel = getModelForClass(UserEntity);
