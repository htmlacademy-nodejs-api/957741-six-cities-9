import chalk from 'chalk';

export class StringPrettifier {
  static info(message: string): string {
    return chalk.blue(message);
  }

  static data(data: unknown): unknown {
    return data;
  }

  static italic(message: string): string {
    return chalk.italic(message);
  }

  static bold(message: string): string {
    return chalk.bold(message);
  }

  static code(message: string): string {
    return chalk.gray(message);
  }

  static comment(message: string): string {
    return chalk.gray(message);
  }

  static error(message: string): string {
    return chalk.red(message);
  }

  static success(message: string): string {
    return chalk.green(message);
  }
}
