import { Char, Parse } from '../../shared/constants/const.js';

export function validateNotEmpty(value: string, fieldName: string): void {
  if (!value || value.trim() === Char.EMPTY) {
    throw new Error(`The parameter "${fieldName}" should not be empty.`);
  }
}

export function validateIsNumber(value: string, fieldName: string): number {
  const numberValue = Number.parseInt(value, Parse.RADIX);
  if (Number.isNaN(numberValue)) {
    throw new Error(`The parameter "${fieldName}" must be a valid number.`);
  }
  return numberValue;
}

export function validateUrl(value: string, fieldName: string): void {
  try {
    new URL(value);
  } catch {
    throw new Error(`The parameter "${fieldName}" must be a valid url.`);
  }
}

export function validateImportCommandParams(params: string[]): void {
  if (params.length !== 7) {
    throw new Error('Import command requires seven parameters: filename, login, password, host, dbname, dbport and salt');
  }
  validateNotEmpty(params[0], 'filename');
  validateNotEmpty(params[1], 'login');
  validateNotEmpty(params[2], 'password');
  validateNotEmpty(params[3], 'host');
  validateNotEmpty(params[4], 'dbname');
  validateNotEmpty(params[5], 'dbport');
  validateNotEmpty(params[6], 'salt');
}

export function validateGenerateCommandParams(params: string[]): { count: number; filepath: string; url: string } {
  if (params.length !== 3) {
    throw new Error('Generate command requires three parameters: count, filepath, and url.');
  }
  const count = validateIsNumber(params[0], 'count');
  validateNotEmpty(params[1], 'filepath');
  validateUrl(params[2], 'url');
  return { count, filepath: params[1], url: params[2] };
}
