#!/usr/bin/env node
import { getClassFromModule, loadModules } from './cli/helpers/load-commands.js';
import { CLIApplication } from './cli/index.js';

async function bootstrap() {
  const modules = await loadModules();
  const commandsClasses = modules.map((module) => getClassFromModule(module));
  const instances = commandsClasses.map((cls) => new cls());

  const cliApplication = new CLIApplication();
  cliApplication.registerCommands(instances);
  cliApplication.processCommand(process.argv);
}

bootstrap();
