import { City, HOUSING_TYPE, AMENITY, Location } from './offer.type.js';
import { USER_TYPE } from './user.type.js';

export type MockServerData = {
  offer: {
    titles: string[];
    descriptions: string[];
    postDates: string[];
    cities: City[];
    previewImages: string[];
    images: string[][];
    isPremium: boolean[];
    isFavorite: boolean[];
    ratings: number[];
    types: HOUSING_TYPE[];
    rooms: number[];
    guests: number[];
    prices: number[];
    amenities: AMENITY[][];
    commentsCount: number[];
    locations: Location[];
  };
  user: {
    names: string[];
    emails: string[];
    avatars: string[];
    passwords: string[];
    userTypes: USER_TYPE[];
  };
  comment: {
    texts: string[];
    ratings: number[];
  };
};
