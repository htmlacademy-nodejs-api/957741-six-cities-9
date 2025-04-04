import { Expose, Transform } from 'class-transformer';

export class CommentRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.soString())
  public id: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public text: string;

  @Expose()
  public rating: number;

  @Expose()
  @Transform(({ obj }) => obj.authorId._id.toString())
  public authorId: string;
}
