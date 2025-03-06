import { fileURLToPath, resolve } from 'node:url';
import { dirname } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { Logger as PinoInstance, pino, transport } from 'pino';

import { Logger } from './logger.interface.js';

export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = fileURLToPath(new URL('.', import.meta.url));
    const logFilePath = '../../../logs/rest.log';
    const destination = resolve(modulePath, logFilePath);
    const destinationDir = dirname(destination);
    // Если директория не существует, создаем её рекурсивно
    if (!existsSync(destinationDir)) {
      mkdirSync(destinationDir, { recursive: true });
    }

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        }
      ],
    });

    this.logger = pino({}, multiTransport);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
