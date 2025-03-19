import { User } from './user.type.js';

export interface Comment {
  text: string;
  date: string;
  rating: number;
  user: User;
}
