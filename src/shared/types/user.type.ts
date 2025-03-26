export enum UserType {
  REGULAR = 'обычный',
  PRO = 'pro',
}

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  userType: UserType;
}

