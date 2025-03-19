#!/usr/bin/env node
import 'reflect-metadata';

import { ImportCommand, GenerateCommand, HelpCommand, VersionCommand } from './cli/commands/index.js';
import { CLIApplication } from './cli/index.js';

async function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new VersionCommand(),
    new HelpCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);
  cliApplication.processCommand(process.argv);
}

bootstrap();
