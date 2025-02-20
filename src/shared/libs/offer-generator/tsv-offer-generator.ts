import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { generateRandomValue, getRandomItem } from '../../helpers/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.offer.titles);
    const description = getRandomItem<string>(this.mockData.offer.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const city = getRandomItem(this.mockData.offer.cities);
    const cityString = `${city.name},${city.location.latitude},${city.location.longitude}`;

    const previewImage = getRandomItem<string>(this.mockData.offer.previewImages);
    const images = getRandomItem<string[]>(this.mockData.offer.images).join(',');
    const isPremium = getRandomItem<boolean>(this.mockData.offer.isPremium).toString();
    const isFavorite = getRandomItem<boolean>(this.mockData.offer.isFavorite).toString();
    const rating = getRandomItem<number>(this.mockData.offer.ratings).toString();
    const type = getRandomItem<string>(this.mockData.offer.types);
    const rooms = getRandomItem<number>(this.mockData.offer.rooms).toString();
    const guests = getRandomItem<number>(this.mockData.offer.guests).toString();
    const price = getRandomItem<number>(this.mockData.offer.prices).toString();
    const amenities = getRandomItem<string[]>(this.mockData.offer.amenities).join(',');
    const commentsCount = getRandomItem<number>(this.mockData.offer.commentsCount).toString();
    const location = getRandomItem(this.mockData.offer.locations);
    const locationString = `${location.latitude},${location.longitude}`;

    // Создаем строку пользователя в формате "name,email,avatar,password,userType"
    const userName = getRandomItem<string>(this.mockData.user.names);
    const userEmail = getRandomItem<string>(this.mockData.user.emails);
    const userAvatar = getRandomItem<string>(this.mockData.user.avatars);
    const userPassword = getRandomItem<string>(this.mockData.user.passwords);
    const userType = getRandomItem<string>(this.mockData.user.userTypes);
    const userString = [userName, userEmail, userAvatar, userPassword, userType].join(',');

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
    ].join('\t');
  }
}
