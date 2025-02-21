import { readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Module from 'node:module';

import { isCommandConstructor } from './is-command-constructor.js';
import { StringPrettifier } from './string-prettifier.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

import { Command } from '../commands/command.interface.js';

const COMMANDS_DIR = '../commands';
const COMMANDS_EXTENSION = '.command.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const commandsDir = resolve(__dirname, COMMANDS_DIR);
const files = await readdir(commandsDir);
const commandFiles = files.filter((file) => file.endsWith(COMMANDS_EXTENSION));
const absolutePathsToCommandFiles = commandFiles.map((file) => join(commandsDir, file));

type ClassFromModule = new (...args: unknown[]) => Command;

export async function loadModules(): Promise<Module[]> {
  try {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const modules = await Promise.all(absolutePathsToCommandFiles.map(async (path) => await import(path)));
    return modules;
  } catch (error) {

    console.error(StringPrettifier.error(getErrorMessage(error)));
    throw error;
  }
}

export function getClassFromModule(module: Module): ClassFromModule {
  try {
    const exports = Object.values(module);
    const exportedClass = exports.find(isCommandConstructor);

    if (exportedClass) {
      return exportedClass;
    } else {
      throw new Error('Module does not export a class');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(StringPrettifier.error(error.message));
    }
    throw error;
  }
}
