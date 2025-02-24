// Файловая система
export const FILE_SYSTEM = {
  CHUNK_SIZE: 16384, // 16KB
  ENCODING: 'utf-8',
  WRITE_FLAGS: {
    WRITE: 'w',
    APPEND: 'a'
  }
} as const;

// Генерация данных
export const TIME = {
  WEEK: {
    FIRST_DAY: 1,
    LAST_DAY: 7
  },
  DATE_FORMAT: 'YYYY-MM-DD'
} as const;

// Валидация предложений
export const OFFER = {
  TITLE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 100
  },
  DESCRIPTION: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 1024
  },
  RATING: {
    MIN: 1,
    MAX: 5
  },
  ROOMS: {
    MIN: 1,
    MAX: 8
  },
  GUESTS: {
    MIN: 1,
    MAX: 10
  },
  PRICE: {
    MIN: 100,
    MAX: 100000
  },
  IMAGES: {
    COUNT: 6
  }
} as const;

// Разделители
export const FILE = {
  SEPARATOR: {
    TSV: '\t',
    CSV: ',',
    NEW_LINE: '\n'
  },
  EXTENSION: {
    TSV: '.tsv',
    JSON: '.json'
  }
} as const;

// Парсинг данных
export const PARSE = {
  RADIX: 10,
  BOOLEAN_TRUE: 'true'
} as const;

// Пользовательские данные
export const USER = {
  MIN_FIELDS: 5
} as const;
