describe('extendsDateExpectation', () => {
  test('should available to use "toBeValidDateStr".', () => {
    expect(new Date().toString()).toBeValidDateStr();
  });
});
