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
    throw new Error(`The parameter "${fieldName}" must be a valid URL.`);
  }
}

export function validateImportCommandParams(params: string[]): void {
  if (params.length !== 1) {
    throw new Error('Import command requires exactly one parameter: the filename.');
  }
  validateNotEmpty(params[0], 'filename');
}

export function validateGenerateCommandParams(params: string[]): { count: number; filepath: string; url: string } {
  if (params.length !== 3) {
    throw new Error('Generate command requires three parameters: count, filepath, and URL.');
  }
  const count = validateIsNumber(params[0], 'count');
  validateNotEmpty(params[1], 'filepath');
  validateUrl(params[2], 'url');
  return { count, filepath: params[1], url: params[2] };
}
