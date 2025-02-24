import { describe, expect, jest, it, beforeEach, afterEach } from '@jest/globals';
import { HelpCommand } from '../../../cli/commands/help.command.js';
import { CommandName } from '../../../cli/constants.js';

describe('HelpCommand', () => {
  let command: HelpCommand;

  beforeEach(() => {
    command = new HelpCommand();
  });

  it('should have correct command name', () => {
    expect(command.getName()).toBe(CommandName.HELP);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
