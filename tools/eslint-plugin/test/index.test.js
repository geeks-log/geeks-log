const ESLintTester = require('eslint').RuleTester;
const rules = require('../lib').rules;

ESLintTester.setDefaultConfig({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const tests = {
  'ban-characters': {
    valid: ['foo', 'bar', 'React'],
    invalid: [
      {
        code: 'Angular',
        errors: [
          {
            messageId: 'isCharacterBanned',
            bannedCharacter: 'Angular',
          },
        ],
        options: [{ bannedCharactersRegex: 'Angular' }],
      },
      {
        code: 'Angular',
        errors: [
          {
            messageId: 'isCharacterBanned',
            data: {
              bannedCharacter: 'A',
            },
          },
          {
            messageId: 'isCharacterBanned',
            data: {
              bannedCharacter: 'n',
            },
          },
        ],
        options: [{ bannedCharactersRegex: '(A|n)' }],
      },
    ],
  },
};

const tester = new ESLintTester();

for (const testKey in tests) {
  tester.run(testKey, rules[testKey], tests[testKey]);
}
