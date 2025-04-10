import { Expose } from 'class-transformer';

export class AuthRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;
}
