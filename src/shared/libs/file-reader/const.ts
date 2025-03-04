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

export const USER = {
  MIN_FIELDS: 5
} as const;

