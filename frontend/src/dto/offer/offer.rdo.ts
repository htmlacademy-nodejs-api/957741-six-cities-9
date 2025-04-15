import { CityDto } from './city.dto';
import { LocationDto } from './location.dto';

export class OfferRdo {
  public id?: string;
  public title?: string;
  public description?: string;
  public createdAt?: Date;
  public city?: CityDto;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public type?: string;
  public rooms?: number;
  public guests?: number;
  public price?: number;
  public amenities?: string[];
  public commentsCount?: number;
  public location?: LocationDto;
}
