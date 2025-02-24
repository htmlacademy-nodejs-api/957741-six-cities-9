import { describe, expect, jest, it, beforeEach, afterEach } from '@jest/globals';
import { VersionCommand } from '../../../cli/commands/version.command.js';
import { CommandName } from '../../../cli/constants.js';

describe('VersionCommand', () => {
  let command: VersionCommand;

  beforeEach(() => {
    command = new VersionCommand();
  });

  it('should have correct command name', () => {
    expect(command.getName()).toBe(CommandName.VERSION);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
