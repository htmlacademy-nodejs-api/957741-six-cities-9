export enum UserType {
  STANDARD = 'standard',
  PRO = 'pro',
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  userType: UserType;
}

export interface Comment {
  text: string;
  date: string;
  rating: number;
  user: User;
}
