export enum USER_TYPE {
  STANDARD = 'standard',
  PRO = 'pro',
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  userType: USER_TYPE;
}

export interface Comment {
  text: string;
  date: string;
  rating: number;
  user: User;
}
