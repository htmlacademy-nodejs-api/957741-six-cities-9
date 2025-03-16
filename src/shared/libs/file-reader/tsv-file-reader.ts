import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer, HOUSING_TYPE, AMENITY, City, Location, CITY_NAME } from '../../types/offer.type.js';
import { User, USER_TYPE } from '../../types/user.type.js';
import { FILE_SYSTEM, FILE } from '../const.js';
import { OFFER, USER } from './const.js';
import { Parse } from '../../constants/const.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(
    private readonly filename: string
  ) {
    super();
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
    ] = line.split(FILE.SEPARATOR.TSV);

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
      rooms: parseInt(rooms, Parse.RADIX),
      guests: parseInt(guests, Parse.RADIX),
      price: parseInt(price, Parse.RADIX),
      amenities: this.parseAmenities(amenities),
      user: this.parseUser(user),
      commentsCount: parseInt(commentsCount, Parse.RADIX),
      location: this.parseLocation(location)
    };
  }

  private parsePostDate(postDate: string): Date {
    return new Date(postDate.trim());
  }

  private parseCity(cityStr: string): City {
    const [name, latStr, lngStr] = cityStr.split(FILE.SEPARATOR.CSV).map((s) => s.trim());
    return {
      name: name as CITY_NAME,
      location: {
        latitude: Number(latStr),
        longitude: Number(lngStr)
      }
    };
  }

  private parseImages(imagesStr: string): [string, string, string, string, string, string] {
    const imgs = imagesStr.split(FILE.SEPARATOR.CSV).map((url) => url.trim());
    if (imgs.length !== OFFER.IMAGES.COUNT) {
      throw new Error(`Invalid number of images: ${imgs.length}`);
    }
    return imgs as [string, string, string, string, string, string];
  }

  private parseBoolean(boolStr: string): boolean {
    return boolStr.trim().toLowerCase() === Parse.BOOLEAN_TRUE;
  }

  private parseHousingType(typeStr: string): HOUSING_TYPE {
    return typeStr.trim().toLowerCase() as HOUSING_TYPE;
  }

  private parseAmenities(amenitiesStr: string): AMENITY[] {
    return amenitiesStr.split(FILE.SEPARATOR.CSV).map((s) => s.trim().toLowerCase()) as AMENITY[];
  }

  private parseUser(userStr: string): User {
    const parts = userStr.split(FILE.SEPARATOR.CSV).map((s) => s.trim());
    if (parts.length < USER.MIN_FIELDS) {
      throw new Error(`Invalid user data: ${userStr}`);
    }
    const [name, email, avatar, password, userType] = parts;
    return { name, email, avatar, password, userType: userType as USER_TYPE };
  }

  private parseLocation(locationStr: string): Location {
    const [latStr, lngStr] = locationStr.split(FILE.SEPARATOR.CSV).map((s) => s.trim());
    return {
      latitude: Number(latStr),
      longitude: Number(lngStr)
    };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: FILE_SYSTEM.CHUNK_SIZE,
      encoding: FILE_SYSTEM.ENCODING,
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf(FILE.SEPARATOR.NEW_LINE)) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }
    this.emit('end', importedRowCount);
  }
}
