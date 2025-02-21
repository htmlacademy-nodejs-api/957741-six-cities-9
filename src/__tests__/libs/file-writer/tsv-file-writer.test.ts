import { WriteStream } from 'node:fs';
import { TSVFileWriter } from '../../../shared/libs/file-writer/tsv-file-writer.js';

jest.mock('node:fs', () => ({
  createWriteStream: jest.fn().mockReturnValue({
    write: jest.fn(),
    end: jest.fn()
  })
}));

describe('TSVFileWriter', () => {
  let writer: TSVFileWriter;
  let mockWriteStream: jest.Mocked<WriteStream>;

  beforeEach(() => {
    writer = new TSVFileWriter('test.tsv');
    mockWriteStream = writer['stream'] as jest.Mocked<WriteStream>;
  });

  test('writes row with newline', () => {
    const row = 'test\tdata';
    writer.write(row);
    expect(mockWriteStream.write).toHaveBeenCalledWith(`${row}\n`);
  });

  test('handles write error', () => {
    const error = new Error('Write error');
    mockWriteStream.write = jest.fn(() => {
      throw error;
    });

    const consoleSpy = jest.spyOn(console, 'error');
    writer.write('test');

    expect(consoleSpy).toHaveBeenCalledWith('Can\'t write to file: Write error');
    consoleSpy.mockRestore();
  });
});
