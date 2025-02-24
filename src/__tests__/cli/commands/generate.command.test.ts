import { describe, expect, jest, it, beforeEach, afterEach } from '@jest/globals';
import { GenerateCommand } from '../../../cli/commands/generate.command.js';
import { CommandName } from '../../../cli/constants.js';

describe('GenerateCommand', () => {
  let command: GenerateCommand;

  beforeEach(() => {
    command = new GenerateCommand();
  });

  it('should have correct command name', () => {
    expect(command.getName()).toBe(CommandName.GENERATE);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
