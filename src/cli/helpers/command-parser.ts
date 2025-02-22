export class CommandParser {
  static parse(argv: string[]): { name: string; args: string[] } {
    const [, , command = '', ...args] = argv;
    return {
      name: command.startsWith('--') ? command : '',
      args: command.startsWith('--') ? args : []
    };
  }
}
