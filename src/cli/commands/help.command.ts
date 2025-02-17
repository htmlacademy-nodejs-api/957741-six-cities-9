import { CommandName } from '../constants.js';
import { getCLIDescription } from '../helpers/get-cli-description.js';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  private commands: Record<string, Command> = {};

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered in help command`);
      }
      this.commands[command.getName()] = command;
    });
  }

  public getName(): CommandName {
    return CommandName.HELP;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.log(getCLIDescription());
  }
}
