import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { StringPrettifier } from '../helpers/string-prettifier.js';

import { Offer } from '../../shared/types/offer.js';
import { Command } from './command.interface.js';
import { CommandName } from '../constants.js';

export class ImportCommand implements Command {
  public getName(): CommandName {
    return CommandName.IMPORT;
  }

  private onImportedOffer(offer: Offer): void {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(StringPrettifier.error(getErrorMessage(error)));
    }
  }
}
