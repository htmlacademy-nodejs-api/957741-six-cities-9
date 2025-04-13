export type RestSchema = {
  PORT: number;
  SALT: string;
  HOST: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  UPLOAD_DIRECTORY: string;
  STATIC_DIRECTORY: string;
  JWT_SECRET: string;
  JWT_ALGORITHM: string;
  JWT_EXPIRED: string;
}
