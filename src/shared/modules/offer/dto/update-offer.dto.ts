import { Type } from 'class-transformer';
import { IsString, Length, ValidateNested, IsUrl, IsArray, ArrayMinSize, ArrayMaxSize, IsBoolean, IsEnum, IsNumber, Min, Max, IsOptional } from 'class-validator';
import { City, Amenity, Location, HousingType, OfferImages } from '../../../types/index.js';
import { CityDto } from './city.dto.js';
import { LocationDto } from './location.dto.js';
import { OFFER_VALIDATION } from './const.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  @Length(OFFER_VALIDATION.TITLE.MIN_LENGTH, OFFER_VALIDATION.TITLE.MAX_LENGTH)
  public title?: string;

  @IsOptional()
  @IsString()
  @Length(OFFER_VALIDATION.DESCRIPTION.MIN_LENGTH, OFFER_VALIDATION.DESCRIPTION.MAX_LENGTH)
  public description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CityDto)
  public city?: City;

  @IsOptional()
  @IsString()
  @IsUrl()
  public previewImage?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(OFFER_VALIDATION.IMAGES.MIN_COUNT)
  @ArrayMaxSize(OFFER_VALIDATION.IMAGES.MAX_COUNT)
  @IsUrl({}, { each: true })
  public images?: OfferImages;

  @IsOptional()
  @IsBoolean()
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(HousingType)
  public type?: HousingType;

  @IsOptional()
  @IsNumber()
  @Min(OFFER_VALIDATION.ROOMS.MIN)
  @Max(OFFER_VALIDATION.ROOMS.MAX)
  public rooms?: number;

  @IsOptional()
  @IsNumber()
  @Min(OFFER_VALIDATION.GUESTS.MIN)
  @Max(OFFER_VALIDATION.GUESTS.MAX)
  public guests?: number;

  @IsOptional()
  @IsNumber()
  @Min(OFFER_VALIDATION.PRICE.MIN)
  @Max(OFFER_VALIDATION.PRICE.MAX)
  public price?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(OFFER_VALIDATION.AMENITIES.MIN_COUNT)
  @IsEnum(Amenity, { each: true })
  public amenities?: Amenity[];

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  public location?: Location;
}
