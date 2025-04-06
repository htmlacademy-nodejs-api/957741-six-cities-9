import { Type } from 'class-transformer';
import { IsNotEmpty, IsEnum, ValidateNested } from 'class-validator';
import { CityName, Location } from '../../../types/offer.type.js';
import { LocationDto } from './location.dto.js';

export class CityDto {
  @IsNotEmpty()
  @IsEnum(CityName)
  public name: CityName;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  public location: Location;
}
