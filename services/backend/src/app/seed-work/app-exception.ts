export class AppException extends Error {
  constructor(public readonly code: string, errorMessage: string = code) {
    super(errorMessage);
  }
}

export function isAppException(exception: unknown): exception is AppException {
  return exception instanceof AppException;
}
