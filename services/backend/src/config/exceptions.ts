import { ExceptionLike } from '~/seed-work';

export enum ConfigExceptionCodes {
  Invalid = 'config.invalid',
}

export class ConfigInvalidException extends Error implements ExceptionLike {
  readonly code = ConfigExceptionCodes.Invalid;

  constructor(message?: string) {
    super(message ?? '');
  }
}
