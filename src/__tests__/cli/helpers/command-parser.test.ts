import { CommandParser } from '../../../cli/helpers/command-parser.js';

describe('CommandParser', () => {
  it('should parse version command correctly', () => {
    const { name } = CommandParser.parse(['node', 'script.js', '--version']);
    expect(name).toBe('--version');
  });

  it('should parse generate command with arguments correctly', () => {
    const { name, args } = CommandParser.parse(['node', 'script.js', '--generate', '5', 'test.tsv', 'http://localhost:3123/api']);
    expect(name).toBe('--generate');
    expect(args).toEqual(['5', 'test.tsv', 'http://localhost:3123/api']);
  });

  it('should handle no command', () => {
    const { name, args } = CommandParser.parse(['node', 'script.js']);
    expect(name).toBe('');
    expect(args).toEqual([]);
  });

  it('should parse help command with no arguments', () => {
    const { name, args } = CommandParser.parse(['node', 'script.js', '--help']);
    expect(name).toBe('--help');
    expect(args).toEqual([]);
  });

  it('should handle empty argv', () => {
    const { name, args } = CommandParser.parse([]);
    expect(name).toBe('');
    expect(args).toEqual([]);
  });

  it('should preserve argument whitespace', () => {
    const { name, args } = CommandParser.parse(['node', 'script.js', '--import', '  test.tsv  ', '  database  ']);
    expect(name).toBe('--import');
    expect(args).toEqual(['  test.tsv  ', '  database  ']);
  });
});
