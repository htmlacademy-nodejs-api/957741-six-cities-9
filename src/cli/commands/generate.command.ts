import { Command } from './command.interface.js';
import { CommandName } from '../constants.js';

export class GenerateCommand implements Command {
  public getName(): CommandName {
    return CommandName.GENERATE;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info('...Генерация произвольного количества тестовых данных');
  }
}
