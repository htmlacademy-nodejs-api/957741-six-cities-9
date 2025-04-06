import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, Min, Max, IsString, MinLength, MaxLength, IsEnum, ValidateNested, IsUrl, IsArray, ArrayMaxSize, ArrayMinSize, IsBoolean, IsMongoId } from 'class-validator';
import { City, Amenity, Location, HousingType, OfferImages } from '../../../types/index.js';
import { CityDto } from './city.dto.js';
import { LocationDto } from './location.dto.js';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  public title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(1024)
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
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
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
  @Min(1)
  @Max(8)
  public rooms: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  public guests: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(100)
  @Max(100000)
  public price: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Amenity, { each: true })
  public amenities: Amenity[];

  @IsNotEmpty()
  @IsMongoId()
  public authorId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  public location: Location;
}
