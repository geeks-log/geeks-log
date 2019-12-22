expect.extend({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toBeOneOf(actual: any, values: any[]) {
    return {
      message: () => '',
      pass: values.some(x => x === actual),
    };
  },
});
