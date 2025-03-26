import {
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';
import { UserEntity, } from '../user/index.js';
import { OfferEntity } from '../offer/index.js';

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  }
})
export class CommentEntity {
  @prop()
  public text: string;

  @prop()
  public rating: number;

  @prop({ ref: () => UserEntity })
  public userId: Ref<UserEntity>;

  @prop({ ref: () => OfferEntity })
  public offerId: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
