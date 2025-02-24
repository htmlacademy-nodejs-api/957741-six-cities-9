import { jest } from '@jest/globals';

const chalk = {
  blue: jest.fn((str: string) => str),
  italic: jest.fn((str: string) => str),
  bold: jest.fn((str: string) => str),
  green: jest.fn((str: string) => str),
  dim: jest.fn((str: string) => str),
  red: jest.fn((str: string) => str)
};

export default chalk;
