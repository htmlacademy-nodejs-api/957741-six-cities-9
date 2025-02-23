import { describe, expect, test } from '@jest/globals';
import { TSVOfferGenerator } from '../../../shared/libs/offer-generator/tsv-offer-generator.js';
import { MockServerData } from '../../../shared/types/mock-server-data.type.js';
import { CityNames, HousingType, Amenity, UserType } from '../../../shared/types/index.js';

describe('TSVOfferGenerator', () => {
  const mockData: MockServerData = {
    offer: {
      titles: ['Beautiful apartment'],
      descriptions: ['A cozy place'],
      postDates: ['2024-01-01'],
      cities: [{
        name: CityNames.PARIS,
        location: {
          latitude: 48.85661,
          longitude: 2.351499
        }
      }],
      previewImages: ['image1.jpg'],
      images: [['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg']],
      isPremium: [true],
      isFavorite: [false],
      ratings: [4.5],
      types: [HousingType.APARTMENT],
      rooms: [2],
      guests: [4],
      prices: [100],
      amenities: [[Amenity.BREAKFAST]],
      commentsCount: [1],
      locations: [{
        latitude: 48.85661,
        longitude: 2.351499
      }]
    },
    user: {
      names: ['John'],
      emails: ['john@example.com'],
      avatars: ['avatar.jpg'],
      passwords: ['password123'],
      userTypes: [UserType.PRO]
    },
    comment: {
      texts: ['Great place!'],
      ratings: [5]
    }
  };

  test('should generate valid TSV string', () => {
    const generator = new TSVOfferGenerator(mockData);
    const result = generator.generate();
    expect(typeof result).toBe('string');
    expect(result.split('\t')).toHaveLength(17);
  });

  test('should include all required fields', () => {
    const generator = new TSVOfferGenerator(mockData);
    const fields = generator.generate().split('\t');

    expect(fields[0]).toBe('Beautiful apartment'); // title
    expect(fields[1]).toBe('A cozy place'); // description
    expect(fields[2]).toMatch(/\d{4}-\d{2}-\d{2}/); // date
    expect(fields[3]).toBe('Paris,48.85661,2.351499'); // city
    expect(fields[4]).toBe('image1.jpg'); // preview image
    expect(fields[5]).toBe('image1.jpg,image2.jpg,image3.jpg,image4.jpg,image5.jpg,image6.jpg'); // images
    expect(fields[6]).toBe('true'); // isPremium
    expect(fields[7]).toBe('false'); // isFavorite
    expect(fields[8]).toBe('4.5'); // rating
    expect(fields[9]).toBe('apartment'); // type
    expect(fields[10]).toBe('2'); // rooms
    expect(fields[11]).toBe('4'); // guests
    expect(fields[12]).toBe('100'); // price
    expect(fields[13]).toBe('breakfast'); // amenities
    expect(fields[14]).toBe('John,john@example.com,avatar.jpg,password123,pro'); // user
    expect(fields[15]).toBe('1'); // comments count
    expect(fields[16]).toBe('48.85661,2.351499'); // location
  });
});
