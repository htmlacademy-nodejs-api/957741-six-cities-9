import { GenerateCommand } from '../../../cli/commands/generate.command.js';
import { CommandName } from '../../../cli/constants.js';

describe('GenerateCommand', () => {
  let command: GenerateCommand;

  beforeEach(() => {
    command = new GenerateCommand();
    // Мокаем приватные методы
    command['load'] = jest.fn().mockResolvedValue(undefined);
    command['write'] = jest.fn().mockResolvedValue(undefined);
  });

  test('returns correct command name', () => {
    expect(command.getName()).toBe(CommandName.GENERATE);
  });

  test('calls load and write with correct parameters', async () => {
    const count = '5';
    const filepath = 'test.tsv';
    const url = 'http://localhost:3123/api';

    await command.execute(count, filepath, url);

    expect(command['load']).toHaveBeenCalledWith(url);
    expect(command['write']).toHaveBeenCalledWith(filepath, 5);
  });

  test('handles load error correctly', async () => {
    const errorMessage = 'Network error';
    command['load'] = jest.fn().mockRejectedValue(new Error(errorMessage));

    const consoleSpy = jest.spyOn(console, 'error');

    await command.execute('5', 'test.tsv', 'http://localhost:3123/api');

    expect(consoleSpy).toHaveBeenCalledWith('Can\'t generate data');
    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);

    consoleSpy.mockRestore();
  });

  test('converts count parameter to number', async () => {
    await command.execute('10', 'test.tsv', 'http://localhost:3123/api');
    expect(command['write']).toHaveBeenCalledWith('test.tsv', 10);
  });
}); 