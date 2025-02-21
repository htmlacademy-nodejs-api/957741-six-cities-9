import got from 'got';
import { appendFile } from 'node:fs/promises';

import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';

import { Command } from './command.interface.js';
import { CommandName } from '../constants.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  public getName(): CommandName {
    return CommandName.GENERATE;
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    for (let i = 0; i < offerCount; i++) {
      await appendFile(
        filepath,
        `${tsvOfferGenerator.generate()}\n`,
        { encoding: 'utf8' }
      );
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
