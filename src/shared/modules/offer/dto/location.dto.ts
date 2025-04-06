import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  public latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  public longitude: number;
}
