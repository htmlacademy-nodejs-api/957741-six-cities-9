import { IsMongoId, IsString, Length, IsInt, IsNotEmpty } from 'class-validator';
import { COMMENT_VALIDATION } from './const.js';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @Length(COMMENT_VALIDATION.TEXT.MIN_LENGTH, COMMENT_VALIDATION.TEXT.MAX_LENGTH)
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
