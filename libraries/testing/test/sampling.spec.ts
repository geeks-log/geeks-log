import { randomIndex, randomInteger, randomKey, sample } from '../src';

describe('sampling', () => {
  describe('randomInteger', () => {
    test('should return value between `min` and `max`.', () => {
      const r1 = randomInteger(0, 10);
      expect(r1).toBeGreaterThanOrEqual(0);
      expect(r1).toBeLessThan(10);

      const r2 = randomInteger(-20, 0);
      expect(r2).toBeGreaterThanOrEqual(-20);
      expect(r2).toBeLessThan(0);

      const r3 = randomInteger(-100, 300);
      expect(r3).toBeGreaterThanOrEqual(-100);
      expect(r3).toBeLessThan(300);
    });

    test('should accept floats.', () => {
      const r1 = randomInteger(2.3, 10.5);
      expect(r1).toBeGreaterThanOrEqual(3);
      expect(r1).toBeLessThan(10);
    });
  });

  describe('randomIndex', () => {
    test('should return random index of collection.', () => {
      const arr1 = [1, 2, 3];
      const index1 = randomIndex(arr1);

      expect(index1).toBeGreaterThanOrEqual(0);
      expect(index1).toBeLessThan(arr1.length);

      // Length of collection is 0.
      expect(randomIndex([])).toEqual(0);
    });
  });

  describe('randomKey', () => {
    test('should return random key of object.', () => {
      const obj = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      };
      const key = randomKey(obj);

      expect(key).toBeOneOf(Object.keys(obj));
    });
  });

  describe('sample', () => {
    test('should return random element of array.', () => {
      const arr = [1, 2, 3];
      const element = sample(arr);

      expect(element).toBeOneOf(arr);
    });

    test('should return random element of object.', () => {
      const obj = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      };
      const element = sample(obj);

      expect(element).toBeOneOf(Object.values(obj));
    });
  });
});
