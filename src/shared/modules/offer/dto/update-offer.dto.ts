import { City, Amenity, Location, HousingType, OfferImages } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public city?: City;
  public previewImage?: string;
  public images?: OfferImages;
  public isPremium?: boolean;
  public type?: HousingType;
  public rooms?: number;
  public guests?: number;
  public price?: number;
  public amenities?: Amenity[];
  public authorId?: string;
  public location?: Location;
}
