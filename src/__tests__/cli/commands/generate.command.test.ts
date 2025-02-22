import { describe, expect, jest, it, beforeEach } from '@jest/globals';
import { GenerateCommand } from '../../../cli/commands/generate.command.js';
import { CommandName } from '../../../cli/constants.js';
import { City, CityNames, HousingType, Amenity, UserType } from '../../../shared/types/index.js';

jest.mock('got', () => ({
  get: jest.fn().mockImplementation(() => Promise.resolve({
    body: ''
  }))
}));

describe('GenerateCommand', () => {
  let command: GenerateCommand;
  let mockGot: { get: jest.Mock };

  const mockCity: City = {
    name: CityNames.PARIS,
    location: {
      latitude: 48.85661,
      longitude: 2.351499
    }
  };

  const mockData = {
    api: {
      offer: {
        titles: ['Beautiful apartment'],
        descriptions: ['A cozy place'],
        postDates: ['2024-01-01'],
        cities: [mockCity],
        previewImages: ['preview.jpg'],
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
    }
  };

  beforeEach(() => {
    command = new GenerateCommand();
    mockGot = jest.requireMock('got');
    jest.clearAllMocks();
  });

  it('should have correct command name', () => {
    expect(command.getName()).toBe(CommandName.GENERATE);
  });

  it('should generate data correctly', async () => {
    mockGot.get.mockImplementationOnce(() => Promise.resolve({
      body: JSON.stringify(mockData)
    }));

    await expect(command.execute('3', 'test.tsv', 'http://localhost:3123')).resolves.not.toThrow();
  });

  it('should handle non-numeric count parameter', async () => {
    await expect(command.execute('abc', 'test.tsv', 'http://localhost:3123')).rejects.toThrow('Count parameter must be a number');
  });

  it('should handle missing parameters', async () => {
    await expect(command.execute()).rejects.toThrow('Missing required parameters');
  });

  it('should handle invalid URL format', async () => {
    await expect(command.execute('3', 'test.tsv', 'invalid-url')).rejects.toThrow('Invalid URL format');
  });
});
