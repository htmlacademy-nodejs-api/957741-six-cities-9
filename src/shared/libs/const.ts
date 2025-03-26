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
    TSV: '\t',
    CSV: ',',
    NEW_LINE: '\n',
  },
  EXTENSION: {
    TSV: '.tsv',
    JSON: '.json'
  }
} as const;
