import { isValid } from 'date-fns';

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeValidDateStr(): void;
    }
  }
}

expect.extend({
  toBeValidDateStr(actual: string) {
    return {
      message: () => '',
      pass: isValid(new Date(actual)),
    };
  },
});
