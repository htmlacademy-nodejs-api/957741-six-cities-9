import got from 'got';
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

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
    } catch (error: unknown) {
      console.error('Can\'t generate data');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
