import { generateRandomValue, getRandomItem, getRandomItems, getErrorMessage } from '../../shared/helpers/common.js';

describe('generateRandomValue', () => {
  test('returns number within specified range', () => {
    const min = 1;
    const max = 10;
    const value = generateRandomValue(min, max);

    expect(value).toBeGreaterThanOrEqual(min);
    expect(value).toBeLessThanOrEqual(max);
  });

  test('respects decimal places', () => {
    const value = generateRandomValue(1, 10, 2);
    const decimalPlaces = value.toString().split('.')[1]?.length || 0;
    expect(decimalPlaces).toBeLessThanOrEqual(2);
  });
});

describe('getRandomItem', () => {
  test('returns item from array', () => {
    const items = ['a', 'b', 'c'];
    const result = getRandomItem(items);
    expect(items).toContain(result);
  });

  test('works with different types', () => {
    const numbers = [1, 2, 3];
    const result = getRandomItem(numbers);
    expect(numbers).toContain(result);
  });
});

describe('getRandomItems', () => {
  test('returns subset of items', () => {
    const items = [1, 2, 3, 4, 5];
    const result = getRandomItems(items);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((item) => {
      expect(items).toContain(item);
    });
  });

  test('returns items in original order', () => {
    const items = [1, 2, 3, 4, 5];
    const result = getRandomItems(items);

    let lastIndex = -1;
    result.forEach((item) => {
      const currentIndex = items.indexOf(item);
      expect(currentIndex).toBeGreaterThan(lastIndex);
      lastIndex = currentIndex;
    });
  });
});

describe('getErrorMessage', () => {
  test('returns error message for Error instance', () => {
    const errorMessage = 'Test error';
    const error = new Error(errorMessage);
    expect(getErrorMessage(error)).toBe(errorMessage);
  });

  test('returns empty string for non-Error values', () => {
    expect(getErrorMessage('string error')).toBe('');
    expect(getErrorMessage(123)).toBe('');
    expect(getErrorMessage(null)).toBe('');
    expect(getErrorMessage(undefined)).toBe('');
  });
});
