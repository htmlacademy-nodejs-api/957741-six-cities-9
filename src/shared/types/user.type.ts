export enum UserType {
  REGULAR = 'regular',
  PRO = 'pro',
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  password: string;
  userType: UserType;
}

