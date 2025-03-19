import { getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
export class UserEntity implements User {
  @prop()
  public email: string;

  @prop()
  public avatarUrl: string;

  @prop()
  public name: string;

  @prop()
  public password: string;

  @prop()
  public userType: UserType;

  constructor(userData: User, salt: string) {
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.name = userData.name;
    this.userType = userData.userType;
    this.password = createSHA256(userData.password, salt);
  }
}

export const UserModel = getModelForClass(UserEntity);
