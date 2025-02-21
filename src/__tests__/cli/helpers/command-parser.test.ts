import { CommandParser } from '../../../cli/helpers/index.js';

describe('CommandParser', () => {
  let parser: CommandParser;

  beforeEach(() => {
    parser = new CommandParser();
  });

  test('parses command name correctly', () => {
    parser.parse(['node', 'script.js', '--version']);
    expect(parser.getName()).toBe('--version');
  });

  test('parses command arguments correctly', () => {
    parser.parse(['node', 'script.js', '--generate', '5', 'test.tsv', 'http://localhost:3123/api']);
    expect(parser.getName()).toBe('--generate');
    expect(parser.getArguments()).toEqual(['5', 'test.tsv', 'http://localhost:3123/api']);
  });

  test('returns empty string for command name when no command provided', () => {
    parser.parse(['node', 'script.js']);
    expect(parser.getName()).toBe('');
  });

  test('returns empty array for arguments when no arguments provided', () => {
    parser.parse(['node', 'script.js', '--help']);
    expect(parser.getArguments()).toEqual([]);
  });

  test('handles empty input array', () => {
    parser.parse([]);
    expect(parser.getName()).toBe('');
    expect(parser.getArguments()).toEqual([]);
  });

  test('ignores extra spaces in arguments', () => {
    parser.parse(['node', 'script.js', '--import', '  test.tsv  ', '  database  ']);
    expect(parser.getArguments()).toEqual(['  test.tsv  ', '  database  ']);
  });

  test('preserves argument order', () => {
    const args = ['arg1', 'arg2', 'arg3'];
    parser.parse(['node', 'script.js', '--command', ...args]);
    expect(parser.getArguments()).toEqual(args);
  });
});
