import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem } from '../../helpers/index.js';
import { TIME } from './const.js';
import { FILE } from '../const.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.offer.titles);
    const description = getRandomItem<string>(this.mockData.offer.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(TIME.WEEK.FIRST_DAY, TIME.WEEK.LAST_DAY), 'day')
      .toISOString();

    const city = getRandomItem(this.mockData.offer.cities);
    const cityString = `${city.name}${FILE.SEPARATOR.CSV}${city.location.latitude}${FILE.SEPARATOR.CSV}${city.location.longitude}`;

    const previewImage = getRandomItem<string>(this.mockData.offer.previewImages);
    const images = getRandomItem<string[]>(this.mockData.offer.images).join(FILE.SEPARATOR.CSV);
    const isPremium = getRandomItem<boolean>(this.mockData.offer.isPremium).toString();
    const isFavorite = getRandomItem<boolean>(this.mockData.offer.isFavorite).toString();
    const rating = getRandomItem<number>(this.mockData.offer.ratings).toString();
    const type = getRandomItem<string>(this.mockData.offer.types);
    const rooms = getRandomItem<number>(this.mockData.offer.rooms).toString();
    const guests = getRandomItem<number>(this.mockData.offer.guests).toString();
    const price = getRandomItem<number>(this.mockData.offer.prices).toString();
    const amenities = getRandomItem<string[]>(this.mockData.offer.amenities).join(FILE.SEPARATOR.CSV);
    const commentsCount = getRandomItem<number>(this.mockData.offer.commentsCount).toString();
    const location = getRandomItem(this.mockData.offer.locations);
    const locationString = `${location.latitude}${FILE.SEPARATOR.CSV}${location.longitude}`;

    const userName = getRandomItem<string>(this.mockData.user.names);
    const userEmail = getRandomItem<string>(this.mockData.user.emails);
    const userAvatar = getRandomItem<string>(this.mockData.user.avatars);
    const userPassword = getRandomItem<string>(this.mockData.user.passwords);
    const userType = getRandomItem<string>(this.mockData.user.userTypes);
    const userString = [userName, userEmail, userAvatar, userPassword, userType].join(FILE.SEPARATOR.CSV);

    return [
      title,
      description,
      postDate,
      cityString,
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
      userString,
      commentsCount,
      locationString
    ].join(FILE.SEPARATOR.TSV);
  }
}
