export interface ExceptionLike {
  readonly code: string;
  readonly message?: string;
}

export function isException(error: unknown): error is ExceptionLike {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return error != null && typeof error === 'object' && typeof (error as any)?.code === 'string';
}

export function matchExceptionCode(error: unknown) {
  return isException(error) ? error.code : null;
}
