import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { CommandName } from '../constants.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): CommandName {
    return CommandName.IMPORT;
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
