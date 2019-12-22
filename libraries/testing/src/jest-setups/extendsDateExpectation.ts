import { isValid } from 'date-fns';

expect.extend({
  toBeValidDateStr(actual: string) {
    return {
      message: () => '',
      pass: isValid(new Date(actual)),
    };
  },
});
