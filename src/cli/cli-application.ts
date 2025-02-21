import { CommandParser } from './helpers/index.js';
import { Command } from './commands/index.js';

type CommandCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandCollection = {};

  constructor(
    private readonly defaultCommand: string = '--help'
  ) { }

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      const commandName = command.getName();
      if (this.commands[commandName]) {
        throw new Error(`Command ${commandName} is already registered`);
      }
      this.commands[commandName] = command;
    });
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parser = new CommandParser();
    parser.parse(argv);
    const commandName = parser.getName();
    const command = this.getCommand(commandName);
    const commandArguments = parser.getArguments();
    command.execute(...commandArguments);
  }
}
