import { createWriteStream } from 'node:fs';
import { FileWriter } from './file-writer.interface.js';

export class TSVFileWriter implements FileWriter {
  private stream: NodeJS.WritableStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public write(row: string): void {
    const data = `${row}\n`;

    if (!this.stream.write(data)) {
      this.stream.once('drain', () => {
        this.stream.write(data);
      });
    }
  }
}
