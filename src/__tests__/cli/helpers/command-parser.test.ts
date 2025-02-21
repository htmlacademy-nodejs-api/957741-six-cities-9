import { CommandParser } from '../../../cli/helpers/command-parser.js';

describe('CommandParser', () => {
  let parser: CommandParser;

  beforeEach(() => {
    parser = new CommandParser([]);
  });

  test('parses command name correctly', () => {
    parser = new CommandParser(['node', 'script.js', '--version']);
    expect(parser.commandName).toBe('--version');
  });

  test('parses command arguments correctly', () => {
    parser = new CommandParser(['node', 'script.js', '--generate', '5', 'test.tsv', 'http://localhost:3123/api']);
    expect(parser.commandName).toBe('--generate');
    expect(parser.commandArguments).toEqual(['5', 'test.tsv', 'http://localhost:3123/api']);
  });

  test('returns empty string for command name when no command provided', () => {
    parser = new CommandParser(['node', 'script.js']);
    expect(parser.commandName).toBe('');
  });

  test('returns empty array for arguments when no arguments provided', () => {
    parser = new CommandParser(['node', 'script.js', '--help']);
    expect(parser.commandArguments).toEqual([]);
  });

  test('handles empty input array', () => {
    parser = new CommandParser([]);
    expect(parser.commandName).toBe('');
    expect(parser.commandArguments).toEqual([]);
  });

  test('ignores extra spaces in arguments', () => {
    parser = new CommandParser(['node', 'script.js', '--import', '  test.tsv  ', '  database  ']);
    expect(parser.commandArguments).toEqual(['  test.tsv  ', '  database  ']);
  });

  test('preserves argument order', () => {
    const args = ['arg1', 'arg2', 'arg3'];
    parser = new CommandParser(['node', 'script.js', '--command', ...args]);
    expect(parser.commandArguments).toEqual(args);
  });
}); 