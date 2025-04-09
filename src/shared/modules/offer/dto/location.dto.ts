import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { LOCATION_VALIDATION } from './const.js';

export class LocationDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(LOCATION_VALIDATION.LATITUDE.MIN)
  @Max(LOCATION_VALIDATION.LATITUDE.MAX)
  public latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(LOCATION_VALIDATION.LONGITUDE.MIN)
  @Max(LOCATION_VALIDATION.LONGITUDE.MAX)
  public longitude: number;
}
