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
  @prop({ unique: true, required: true })
  public email!: string;

  @prop({ default: '' })
  public avatar!: string;

  @prop({ required: true, default: '' })
  public name!: string;

  @prop({ required: true, default: '' })
  public password!: string;

  @prop({ required: true, default: '' })
  public userType!: UserType;

  constructor(userData: User, salt: string) {
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.userType = userData.userType;
    this.password = createSHA256(this.password, salt);
  }
}

export const UserModel = getModelForClass(UserEntity);
