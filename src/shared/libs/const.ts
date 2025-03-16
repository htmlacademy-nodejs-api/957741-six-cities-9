import { Char } from '../constants/const.js';

export const FILE_SYSTEM = {
  CHUNK_SIZE: 16384,
  ENCODING: 'utf-8',
  WRITE_FLAGS: {
    WRITE: 'w',
    APPEND: 'a'
  }
} as const;

export const FILE = {
  SEPARATOR: {
    TSV: Char.TAB,
    CSV: Char.COMMA,
    NEW_LINE: Char.NEW_LINE,
  },
  EXTENSION: {
    TSV: '.tsv',
    JSON: '.json'
  }
} as const;
