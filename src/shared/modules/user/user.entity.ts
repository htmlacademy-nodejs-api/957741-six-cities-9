import { modelOptions, getModelForClass, prop } from '@typegoose/typegoose';

import { User, UserType } from '../../types/index.js';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  }
})
export class UserEntity implements User {
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
