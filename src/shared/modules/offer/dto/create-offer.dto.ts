import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, Min, Max, IsString, Length, IsEnum, ValidateNested, IsUrl, IsArray, ArrayMaxSize, ArrayMinSize, IsBoolean } from 'class-validator';
import { City, Amenity, Location, HousingType, OfferImages } from '../../../types/index.js';
import { CityDto } from './city.dto.js';
import { LocationDto } from './location.dto.js';
import { OFFER_VALIDATION } from './const.js';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  @Length(OFFER_VALIDATION.TITLE.MIN_LENGTH, OFFER_VALIDATION.TITLE.MAX_LENGTH)
  public title: string;

  @IsNotEmpty()
  @IsString()
  @Length(OFFER_VALIDATION.DESCRIPTION.MIN_LENGTH, OFFER_VALIDATION.DESCRIPTION.MAX_LENGTH)
  public description: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CityDto)
  public city: City;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  public previewImage: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(OFFER_VALIDATION.IMAGES.MIN_COUNT)
  @ArrayMaxSize(OFFER_VALIDATION.IMAGES.MAX_COUNT)
  @IsUrl({}, { each: true })
  public images: OfferImages;

  @IsNotEmpty()
  @IsBoolean()
  public isPremium: boolean;

  @IsNotEmpty()
  @IsEnum(HousingType)
  public type: HousingType;

  @IsNotEmpty()
  @IsNumber()
  @Min(OFFER_VALIDATION.ROOMS.MIN)
  @Max(OFFER_VALIDATION.ROOMS.MAX)
  public rooms: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(OFFER_VALIDATION.GUESTS.MIN)
  @Max(OFFER_VALIDATION.GUESTS.MAX)
  public guests: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(OFFER_VALIDATION.PRICE.MIN)
  @Max(OFFER_VALIDATION.PRICE.MAX)
  public price: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(OFFER_VALIDATION.AMENITIES.MIN_COUNT)
  @IsEnum(Amenity, { each: true })
  public amenities: Amenity[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  public location: Location;
}
