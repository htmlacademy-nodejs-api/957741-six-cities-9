import { createReadStream } from 'node:fs';
import { TSVFileReader } from '../../../shared/libs/file-reader/tsv-file-reader.js';
import EventEmitter from 'node:events';

const mockContent =
  `title1\tdesc1\t2024-01-01\tParis,48.85661,2.351499\tpreview1.jpg\timg1.jpg,img2.jpg,img3.jpg,img4.jpg,img5.jpg,img6.jpg\ttrue\tfalse\t4.5\tapartment\t2\t4\t1000\tbreakfast,wifi\tJohn,john@test.com,avatar.jpg,pass123,standard\t5\t48.85661,2.351499
title2\tdesc2\t2024-01-02\tBrussels,50.846557,4.351697\tpreview2.jpg\timg7.jpg,img8.jpg,img9.jpg,img10.jpg,img11.jpg,img12.jpg\tfalse\ttrue\t4.8\thouse\t3\t6\t2000\twasher,towels\tJane,jane@test.com,avatar2.jpg,pass456,pro\t10\t50.846557,4.351697`;

jest.mock('node:fs', () => ({
  createReadStream: jest.fn()
}));

describe('TSVFileReader', () => {
  let reader: TSVFileReader;
  let mockStream: EventEmitter;

  beforeEach(() => {
    mockStream = new EventEmitter();
    (createReadStream as jest.Mock).mockReturnValue(mockStream);
    reader = new TSVFileReader('test.tsv');
  });

  test('emits line event for each valid line', async () => {
    const onLine = jest.fn();
    reader.on('line', onLine);

    const readPromise = reader.read();

    mockStream.emit('data', mockContent);
    mockStream.emit('end');

    await readPromise;

    expect(onLine).toHaveBeenCalledTimes(2);

    const firstCall = onLine.mock.calls[0][0];
    expect(firstCall).toEqual(expect.objectContaining({
      title: 'title1',
      description: 'desc1',
      type: 'apartment',
      rooms: 2,
      guests: 4,
      price: 1000,
      user: expect.objectContaining({
        name: 'John',
        email: 'john@test.com'
      })
    }));
  });

  test('emits end event with correct count', async () => {
    const onEnd = jest.fn();
    reader.on('end', onEnd);

    const readPromise = reader.read();

    mockStream.emit('data', mockContent);
    mockStream.emit('end');

    await readPromise;

    expect(onEnd).toHaveBeenCalledWith(2);
  });

  test('handles partial chunks correctly', async () => {
    const onLine = jest.fn();
    reader.on('line', onLine);

    const readPromise = reader.read();

    // Отправляем данные по частям
    mockStream.emit('data', mockContent.slice(0, 100));
    mockStream.emit('data', mockContent.slice(100));
    mockStream.emit('end');

    await readPromise;

    expect(onLine).toHaveBeenCalledTimes(2);
  });

  test('handles empty lines', async () => {
    const onLine = jest.fn();
    reader.on('line', onLine);

    const readPromise = reader.read();

    mockStream.emit('data', '\n\n' + mockContent + '\n\n');
    mockStream.emit('end');

    await readPromise;

    expect(onLine).toHaveBeenCalledTimes(2);
  });
}); 