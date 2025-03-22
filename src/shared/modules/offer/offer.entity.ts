import {
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';
import { UserEntity, } from '../user/index.js';
import { Location, HousingType, Amenity, City, CityName } from '../../types/index.js';

export class OfferLocation implements Location {
  @prop()
  public latitude: number;

  @prop()
  public longitude: number;
}

export class OfferСity implements City {
  @prop()
  public name: CityName;

  @prop({ type: () => OfferLocation })
  public location: Location;
}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
export class OfferEntity {
  @prop()
  public title: string;

  @prop()
  public description: string;

  @prop({ type: () => OfferСity })
  public city: City;

  @prop()
  public previewImage: string;

  @prop({ type: () => [String] })
  public images: string[];

  @prop()
  public isPremium: boolean;

  @prop()
  public rating: number;

  @prop()
  public type: HousingType;

  @prop()
  public rooms: number;

  @prop()
  public guests: number;

  @prop()
  public price: number;

  @prop({ type: () => [String] })
  public amenities: Amenity[];

  @prop({ ref: () => UserEntity })
  public userId: Ref<UserEntity>;

  @prop()
  public commentsCount: number;

  @prop({ type: () => OfferLocation })
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
