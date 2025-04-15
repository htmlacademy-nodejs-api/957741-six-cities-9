import { CityDto } from './city.dto';
import { LocationDto } from './location.dto';

export class CreateOfferDto {
  public title?: string;
  public description?: string;
  public city?: CityDto;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public type?: string;
  public rooms?: number;
  public guests?: number;
  public price?: number;
  public amenities?: string[];
  public authorId?: string;
  public location?: LocationDto;
}
