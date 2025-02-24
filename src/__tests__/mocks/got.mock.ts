import { jest } from '@jest/globals';

const got = {
  get: jest.fn(() => Promise.resolve({ body: '' }))
};

export default got;
