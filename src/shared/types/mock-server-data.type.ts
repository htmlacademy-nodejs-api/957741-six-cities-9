import { City, HousingType, Amenity, Location } from './offer.js';
import { UserType } from './user.js';

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
    types: HousingType[];
    rooms: number[];
    guests: number[];
    prices: number[];
    amenities: Amenity[][];
    commentsCount: number[];
    locations: Location[];
  };
  user: {
    names: string[];
    emails: string[];
    avatars: string[];
    passwords: string[];
    userTypes: UserType[];
  };
  comment: {
    texts: string[];
    ratings: number[];
  };
};
