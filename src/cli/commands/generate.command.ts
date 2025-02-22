import got from 'got';
import { Command } from './command.interface.js';
import { CommandName } from '../constants.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';

export class GenerateCommand implements Command {
  private readonly timeout = { request: 10000 };

  public getName(): CommandName {
    return CommandName.GENERATE;
  }

  private validateUrl(url: string): void {
    try {
      new URL(url);
    } catch {
      throw new Error('Invalid URL format');
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;

    if (!count || !filepath || !url) {
      throw new Error('Missing required parameters');
    }

    const offerCount = Number.parseInt(count, 10);
    if (Number.isNaN(offerCount)) {
      throw new Error('Count parameter must be a number');
    }

    this.validateUrl(url);

    try {
      const { body } = await got.get(url, { timeout: this.timeout });
      const mockData = JSON.parse(body) as { api: MockServerData };

      const tsvOfferGenerator = new TSVOfferGenerator(mockData.api);
      const tsvFileWriter = new TSVFileWriter(filepath);

      for (let i = 0; i < offerCount; i++) {
        const offer = tsvOfferGenerator.generate();
        tsvFileWriter.write(offer);
      }

      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      throw new Error(`Failed to generate data: ${getErrorMessage(error)}`);
    }
  }
}
