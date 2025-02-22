import { describe, expect, jest, test } from '@jest/globals';
import { createWriteStream } from 'node:fs';
import { TSVFileWriter } from '../../../shared/libs/file-writer/tsv-file-writer.js';

jest.mock('node:fs');

describe('TSVFileWriter', () => {
  const mockWriteStream = {
    write: jest.fn(),
    end: jest.fn(),
    once: jest.fn(),
  };

  beforeEach(() => {
    (createWriteStream as jest.Mock).mockReturnValue(mockWriteStream);
    jest.clearAllMocks();
  });

  test('should write row to file', () => {
    const writer = new TSVFileWriter('test.tsv');
    const row = ['value1', 'value2'].join('\t');

    mockWriteStream.write.mockReturnValue(true);
    writer.write(row);

    expect(mockWriteStream.write).toHaveBeenCalledWith(`${row}\n`);
  });

  test('should handle write buffer full', () => {
    const writer = new TSVFileWriter('test.tsv');
    const row = ['value1', 'value2'].join('\t');

    mockWriteStream.write.mockReturnValue(false);
    writer.write(row);

    expect(mockWriteStream.once).toHaveBeenCalledWith('drain', expect.any(Function));
  });
});
