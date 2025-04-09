export const OFFER_VALIDATION = {
  TITLE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 100,
  },
  DESCRIPTION: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 1024,
  },
  IMAGES: {
    MIN_COUNT: 6,
    MAX_COUNT: 6,
  },
  ROOMS: {
    MIN: 1,
    MAX: 8,
  },
  GUESTS: {
    MIN: 1,
    MAX: 10,
  },
  PRICE: {
    MIN: 100,
    MAX: 100000,
  },
  AMENITIES: {
    MIN_COUNT: 1,
  },
} as const;

export const LOCATION_VALIDATION = {
  LATITUDE: {
    MIN: -90,
    MAX: 90,
  },
  LONGITUDE: {
    MIN: -180,
    MAX: 180,
  },
} as const;

