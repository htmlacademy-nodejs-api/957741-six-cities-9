import { CommandName } from '../constants.js';

export interface Command {
    getName(): CommandName;
    execute(...parameters: string[]): void;
}
