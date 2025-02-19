import chalk from 'chalk';

export class StringPrettifier {
  static info(message: string) {
    return chalk.blue(message);
  }

  static data(data: unknown) {
    return data;
  }

  static italic(message: string) {
    return chalk.italic(message);
  }

  static bold(message: string) {
    return chalk.bold(message);
  }


  static code(message: string) {
    return chalk.green(message);
  }

  static comment(message: string) {
    return chalk.dim(message);
  }

  static error(message: string) {
    return chalk.red(message);
  }
}
