/**
 * Random integer between 'min' to 'max'.
 * The maximum is exclusive and the minimum is inclusive.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInteger(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

type Collection<T> = Array<T> | { [key: string]: T };
type ElementOf<T> = T extends Array<infer R1>
  ? R1
  : T extends { [key: string]: infer R2 }
  ? R2
  : never;

/**
 * Random index of array.
 */
export function randomIndex<T>(collection: T[]): number {
  return randomInteger(0, collection.length);
}

/**
 * Random key of object.
 */
export function randomKey(obj: object): string {
  const keys = Object.keys(obj);
  const index = randomInteger(0, keys.length);

  return keys[index];
}

/**
 * Get a random element from 'collection'.
 */
export function sample<T>(collection: Collection<T>): ElementOf<Collection<T>> | undefined {
  let result;

  if (Array.isArray(collection)) {
    result = collection[randomIndex(collection)];
  } else if (typeof collection === 'object') {
    result = collection[randomKey(collection)];
  }

  return result;
}
