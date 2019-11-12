import { $$TYPE, Dispatchable } from '@geeks-log/event-system';
import generateUUId from 'uuid/v4';

export function matchType<T extends Dispatchable>(value: unknown, type: string): value is T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof value === 'object' && value != null && (value as any)[$$TYPE] === type;
}

export function createId() {
  return generateUUId();
}

export function createTimestamp() {
  return new Date().toISOString();
}
