import { IsMongoId, IsString, MinLength, MaxLength, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  public text: string;

  @IsNotEmpty()
  @IsInt()
  public rating: number;

  @IsNotEmpty()
  @IsMongoId()
  public offerId: string;

  @IsNotEmpty()
  @IsMongoId()
  public authorId: string;
}
