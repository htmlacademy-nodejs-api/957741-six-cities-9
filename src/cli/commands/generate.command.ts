import { Command } from './command.interface.js';
import { CommandName } from '../constants.js';

export class GenerateCommand implements Command {
  public getName(): CommandName {
    return CommandName.GENERATE;
  }

  public execute(...parameters: string[]): void {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    // Код для получения данных с сервера.
    // Формирование объявлений.
  }
}
