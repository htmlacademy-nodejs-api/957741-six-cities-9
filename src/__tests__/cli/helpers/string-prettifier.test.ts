import { describe, expect, jest, test } from '@jest/globals';
import { StringPrettifier } from '../../../cli/helpers/string-prettifier.js';

jest.mock('chalk', () => ({
  blue: jest.fn((str) => `blue:${str}`),
  red: jest.fn((str) => `red:${str}`),
  green: jest.fn((str) => `green:${str}`),
  gray: jest.fn((str) => `gray:${str}`),
  italic: jest.fn((str) => `italic:${str}`),
  bold: jest.fn((str) => `bold:${str}`)
}));

describe('StringPrettifier', () => {
  test('should format info message', () => {
    const message = 'test info';
    const result = StringPrettifier.info(message);
    expect(result).toBe('blue:test info');
  });

  test('should format error message', () => {
    const message = 'test error';
    const result = StringPrettifier.error(message);
    expect(result).toBe('red:test error');
  });

  test('should format success message', () => {
    const message = 'test success';
    const result = StringPrettifier.success(message);
    expect(result).toBe('green:test success');
  });

  test('should handle empty strings', () => {
    expect(StringPrettifier.info('')).toBe('blue:');
    expect(StringPrettifier.error('')).toBe('red:');
    expect(StringPrettifier.success('')).toBe('green:');
  });
});

