import { City, Amenity, Location, HousingType, OfferImages } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public createdAt: Date;
  public city: City;
  public previewImage: string;
  public images: OfferImages;
  public isPremium: boolean;
  public rating: number;
  public type: HousingType;
  public rooms: number;
  public guests: number;
  public price: number;
  public amenities: Amenity[];
  public authorId: string;
  public commentsCount?: number;
  public location: Location;
}
