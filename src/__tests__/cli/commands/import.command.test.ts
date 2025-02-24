import { describe, expect, jest, it, beforeEach, afterEach } from '@jest/globals';
import { ImportCommand } from '../../../cli/commands/import.command.js';
import { CommandName } from '../../../cli/constants.js';

describe('ImportCommand', () => {
  let command: ImportCommand;

  beforeEach(() => {
    command = new ImportCommand();
  });

  it('should have correct command name', () => {
    expect(command.getName()).toBe(CommandName.IMPORT);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
