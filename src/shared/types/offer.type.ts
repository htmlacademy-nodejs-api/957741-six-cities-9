import { User } from './user.type.js';

export enum CityName {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf'
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface City {
  name: CityName;
  location: Location
}

export enum Amenity {
  BREAKFAST = 'breakfast',
  AIR_CONDITIONING = 'air conditioning',
  LAPTOP_FRIENDLY_WORKSPACE = 'laptop friendly workspace',
  BABY_SEAT = 'baby seat',
  WASHER = 'washer',
  TOWELS = 'towels',
  FRIDGE = 'fridge'
}

export enum HousingType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  ROOM = 'room',
  HOTEL = 'hotel'
}

export interface Offer {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: [string, string, string, string, string, string];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  rooms: number;
  guests: number;
  price: number;
  amenities: Amenity[];
  user: User;
  commentsCount?: number;
  location: Location;
}
