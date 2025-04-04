import { Expose, Transform } from 'class-transformer';
import { City, Amenity, Location, HousingType } from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.soString())
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  @Transform(({ obj }) => obj.isFavorite ?? false)
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: HousingType;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public price: number;

  @Expose()
  public amenities: Amenity[];

  @Expose()
  public commentsCount: number;

  @Expose()
  public location: Location;
}
