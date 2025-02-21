import chalk from 'chalk';
import { StringPrettifier } from '../../../cli/helpers/string-prettifier.js';

describe('StringPrettifier', () => {
  test('formats error message in red', () => {
    const message = 'Test error';
    const result = StringPrettifier.error(message);
    expect(result).toBe(chalk.red(message));
  });

  test('formats info message in blue', () => {
    const message = 'Test info';
    const result = StringPrettifier.info(message);
    expect(result).toBe(chalk.blue(message));
  });

  test('formats success message in green', () => {
    const message = 'Test success';
    const result = StringPrettifier.success(message);
    expect(result).toBe(chalk.green(message));
  });

  test('handles empty strings', () => {
    expect(StringPrettifier.error('')).toBe(chalk.red(''));
    expect(StringPrettifier.info('')).toBe(chalk.blue(''));
    expect(StringPrettifier.success('')).toBe(chalk.green(''));
  });

  test('handles non-string input by converting to string', () => {
    const numberInput = 123;
    expect(StringPrettifier.error(numberInput)).toBe(chalk.red(String(numberInput)));
    expect(StringPrettifier.info(numberInput)).toBe(chalk.blue(String(numberInput)));
    expect(StringPrettifier.success(numberInput)).toBe(chalk.green(String(numberInput)));
  });
}); 