import chalk from 'chalk';

import { config } from './config';

const prefix = `[${config.emoji} ${config.name}]:`;

export function log(message: string): void {
  console.log(chalk.bold(`${prefix} ${message}`));
}

export function logError(error: Error): void {
  logSpacer();
  console.error(chalk.bgRed(`${prefix} An error has occurred: ${error.message}`));

}

export function logSpacer(): void {
  console.log(``);
}