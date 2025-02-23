import { describe, expect, jest, it, beforeEach } from '@jest/globals';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { TSVFileReader } from '../../../shared/libs/file-reader/tsv-file-reader.js';
import { CityNames } from '../../../shared/types/index.js';
import { User } from '../../../shared/types/index.js';
import { Offer } from '../../../shared/types/index.js';
import { HousingType } from '../../../shared/types/index.js';
import { UserType } from '../../../shared/types/index.js';
import { Amenity } from '../../../shared/types/index.js';

jest.mock('node:fs');
jest.mock('node:readline');

describe('TSVFileReader', () => {
  let fileReader: TSVFileReader;
  const images: [string, string, string, string, string, string] = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg',
    'image6.jpg'
  ];
  const mockLine = `test title\tdescription\t2024-01-01\tParis,48.85661,2.351499\tpreview.jpg\t${images.join(',')}\ttrue\tfalse\t4.5\tHouse\t3\t6\t100\tBREAKFAST,WASHER\tJohn,john@example.com,avatar.jpg,password123,pro\t0\t48.85661,2.351499`;
  const mockOffer: Offer = {
    title: 'test title',
    description: 'description',
    postDate: new Date('2024-01-01'),
    city: {
      name: CityNames.PARIS,
      location: {
        latitude: 48.85661,
        longitude: 2.351499
      }
    },
    previewImage: 'preview.jpg',
    images,
    isPremium: true,
    isFavorite: false,
    rating: 4.5,
    type: HousingType.HOUSE,
    rooms: 3,
    guests: 6,
    price: 100,
    amenities: [Amenity.BREAKFAST, Amenity.WASHER],
    user: {
      name: 'John',
      email: 'john@example.com',
      avatar: 'avatar.jpg',
      password: 'password123',
      userType: UserType.PRO
    } as User,
    commentsCount: 0,
    location: {
      latitude: 48.85661,
      longitude: 2.351499
    }
  };

  beforeEach(() => {
    fileReader = new TSVFileReader('test.tsv');
  });

  it('should read file content', async () => {
    const iterator = {
      hasNext: true,
      async next() {
        if (!this.hasNext) {
          return { done: true, value: undefined };
        }
        this.hasNext = false;
        return { done: false, value: mockLine };
      }
    };

    const mockReadline = {
      [Symbol.asyncIterator]: () => iterator,
      close: jest.fn().mockImplementation(() => Promise.resolve())
    };

    (createReadStream as jest.Mock).mockReturnValue({ close: jest.fn() });
    (createInterface as jest.Mock).mockReturnValue(mockReadline);

    const parsedOffers: Offer[] = [];
    fileReader.on('line', (line) => {
      parsedOffers.push(fileReader['parseLineToOffer'](line));
    });

    await fileReader.read();

    expect(parsedOffers).toHaveLength(1);
    expect(parsedOffers[0]).toEqual(mockOffer);
  });
});
