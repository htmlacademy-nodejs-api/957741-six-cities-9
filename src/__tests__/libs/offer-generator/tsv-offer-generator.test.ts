import { TSVOfferGenerator } from '../../../shared/libs/offer-generator/tsv-offer-generator.js';
import { MockServerData } from '../../../shared/types/mock-server-data.type.js';

describe('TSVOfferGenerator', () => {
  let mockData: MockServerData;

  beforeEach(() => {
    mockData = {
      offer: {
        titles: ['Test Title'],
        descriptions: ['Test Description'],
        postDates: ['2024-01-01T00:00:00.000Z'],
        cities: [{
          name: 'Paris',
          location: { latitude: 48.85661, longitude: 2.351499 }
        }],
        previewImages: ['preview.jpg'],
        images: [['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']],
        isPremium: [true],
        isFavorite: [false],
        ratings: [4.5],
        types: ['apartment'],
        rooms: [2],
        guests: [4],
        prices: [1000],
        amenities: [['breakfast', 'wifi']],
        commentsCount: [5],
        locations: [{ latitude: 48.85661, longitude: 2.351499 }]
      },
      user: {
        names: ['Test User'],
        emails: ['test@example.com'],
        avatars: ['avatar.jpg'],
        passwords: ['password123'],
        userTypes: ['standard']
      },
      comment: {
        texts: ['Test Comment'],
        ratings: [5]
      }
    };
  });

  test('generates valid TSV string', () => {
    const generator = new TSVOfferGenerator(mockData);
    const result = generator.generate();

    expect(typeof result).toBe('string');
    const parts = result.split('\t');
    expect(parts.length).toBe(17); // Проверяем количество колонок
  });

  test('generates string with required fields', () => {
    const generator = new TSVOfferGenerator(mockData);
    const result = generator.generate();
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
    ] = result.split('\t');

    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(postDate).toMatch(/^\d{4}-\d{2}-\d{2}/); // Проверяем формат даты
    expect(city).toContain('Paris');
    expect(previewImage).toBeTruthy();
    expect(images.split(',').length).toBe(6);
    expect(['true', 'false']).toContain(isPremium);
    expect(['true', 'false']).toContain(isFavorite);
    expect(Number(rating)).toBeTruthy();
    expect(type).toBeTruthy();
    expect(Number(rooms)).toBeTruthy();
    expect(Number(guests)).toBeTruthy();
    expect(Number(price)).toBeTruthy();
    expect(amenities).toBeTruthy();
    expect(user.split(',').length).toBe(5);
    expect(Number(commentsCount)).toBeGreaterThanOrEqual(0);
    expect(location.split(',').length).toBe(2);
  });
}); 