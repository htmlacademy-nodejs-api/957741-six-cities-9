import chalk from 'chalk';
import { CommandName } from '../constants.js';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): CommandName {
    return CommandName.HELP;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(chalk.green(`
      Программа для подготовки данных для REST API сервера.
      Пример:
          cli.js --<command> [--arguments]
      Команды:
          --version:                   # выводит номер версии приложения
          --help:                      # печатает текст с подсказками
          --import <path>:             # импортирует данные из TSV по пути, переданному в параметре <path>
          --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `));
  }
}
