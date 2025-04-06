import { Type } from 'class-transformer';
import { IsString, MinLength, MaxLength, ValidateNested, IsUrl, IsArray, ArrayMinSize, ArrayMaxSize, IsBoolean, IsEnum, IsNumber, Min, Max, IsMongoId } from 'class-validator';
import { City, Amenity, Location, HousingType, OfferImages } from '../../../types/index.js';
import { CityDto } from './city.dto.js';
import { LocationDto } from './location.dto.js';

export class UpdateOfferDto {
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  public title?: string;

  @IsString()
  @MinLength(20)
  @MaxLength(1024)
  public description?: string;

  @ValidateNested()
  @Type(() => CityDto)
  public city?: City;

  @IsString()
  @IsUrl()
  public previewImage?: string;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsUrl({}, { each: true })
  public images?: OfferImages;

  @IsBoolean()
  public isPremium?: boolean;

  @IsEnum(HousingType)
  public type?: HousingType;

  @IsNumber()
  @Min(1)
  @Max(8)
  public rooms?: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  public guests?: number;

  @IsNumber()
  @Min(100)
  @Max(100000)
  public price?: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Amenity, { each: true })
  public amenities?: Amenity[];

  @IsMongoId()
  public authorId?: string;

  @ValidateNested()
  @Type(() => LocationDto)
  public location?: Location;
}
