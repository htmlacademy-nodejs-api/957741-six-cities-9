
import { Char } from '../../shared/constants/const.js';
import { CommandName } from '../constants.js';
import { StringPrettifier } from './string-prettifier.js';

interface CommandInfo {
  command: CommandName;
  args?: string;
  comment: string;
}

const APP_DESCRIPTION = 'Программа для подготовки данных для REST API сервера.';
const COMMAND_EXAMPLE = 'main.cli.js --<command> [--arguments]';
const COMMAND_SEPARATOR = `'${Char.NEW_LINE}${Char.SPACE}${Char.SPACE}`;

const CommandInfoData: CommandInfo[] = [
  {
    command: CommandName.VERSION,
    comment: '# выводит номер версии'
  },
  {
    command: CommandName.HELP,
    comment: '# печатает этот текст'
  },
  {
    command: CommandName.IMPORT,
    args: '<path>',
    comment: '# импортирует данные из TSV'
  },
  {
    command: CommandName.GENERATE,
    args: '<n> <path> <url>',
    comment: '# генерирует произвольное количество тестовых данных'
  },
];

const commandStrings = CommandInfoData.map(({ command, args }) => command + (args ? ` ${args}` : ''));
const maxCommandLength = Math.max(...commandStrings.map((str) => str.length));

const commandDescriptions = CommandInfoData.map(({ command, args, comment }) => {
  const commandLength = (command + (args ? `${args}` : Char.EMPTY)).length;
  const separator = Char.SPACE.repeat(maxCommandLength - commandLength + 4);
  return `${StringPrettifier.code(command)} ${args ? StringPrettifier.code(args) : Char.EMPTY}${separator}${StringPrettifier.comment(comment)}`;
}).join(COMMAND_SEPARATOR);

export const getCLIDescription = () => (`
  ${StringPrettifier.info(APP_DESCRIPTION)}

  ${StringPrettifier.bold('Пример: ')}${StringPrettifier.code(COMMAND_EXAMPLE)}

  ${StringPrettifier.bold('Команды:')}

  ${commandDescriptions}
`);
