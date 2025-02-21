import EventEmitter from 'node:events';
import { FileReader } from './file-reader.interface.js';

import { Offer, HousingType, Amenity, City, Location, CityNames } from '../../types/offer.js';
import { User, UserType } from '../../types/user.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {
    super();
  }


  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      amenities,
      user,
      commentsCount,
      location
    ] = line.split('\t');

    return {
      title: title.trim(),
      description: description.trim(),
      postDate: this.parsePostDate(postDate),
      city: this.parseCity(city),
      previewImage: previewImage.trim(),
      images: this.parseImages(images),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: parseFloat(rating),
      type: this.parseHousingType(type),
      rooms: parseInt(rooms, 10),
      guests: parseInt(guests, 10),
      price: parseInt(price, 10),
      amenities: this.parseAmenities(amenities),
      user: this.parseUser(user),
      commentsCount: parseInt(commentsCount, 10),
      location: this.parseLocation(location)
    };
  }

  private parsePostDate(postDate: string): Date {
    return new Date(postDate.trim());
  }

  private parseCity(cityStr: string): City {
    const [name, latStr, lngStr] = cityStr.split(',').map((s) => s.trim());
    return {
      name: name as CityNames,
      location: {
        latitude: Number(latStr),
        longitude: Number(lngStr)
      }
    };
  }

  private parseImages(imagesStr: string): [string, string, string, string, string, string] {
    const imgs = imagesStr.split(',').map((url) => url.trim());
    if (imgs.length !== 6) {
      throw new Error(`Некорректное количество изображений: ${imgs.length}`);
    }
    return imgs as [string, string, string, string, string, string];
  }

  private parseBoolean(boolStr: string): boolean {
    return boolStr.trim().toLowerCase() === 'true';
  }

  private parseHousingType(typeStr: string): HousingType {
    return typeStr.trim().toLowerCase() as HousingType;
  }

  private parseAmenities(amenitiesStr: string): Amenity[] {
    return amenitiesStr.split(',').map((s) => s.trim().toLowerCase()) as Amenity[];
  }

  private parseUser(userStr: string): User {
    // Ожидается формат: "name,email,avatar,password,userType"
    const parts = userStr.split(',').map((s) => s.trim());
    if (parts.length < 5) {
      throw new Error(`Некорректные данные пользователя: ${userStr}`);
    }
    const [name, email, avatar, password, userType] = parts;
    return { name, email, avatar, password, userType: userType as UserType };
  }

  private parseLocation(locationStr: string): Location {
    const [latStr, lngStr] = locationStr.split(',').map((s) => s.trim());
    return {
      latitude: Number(latStr),
      longitude: Number(lngStr)
    };
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  public read(): void {
    // Код для работы с потоками
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
