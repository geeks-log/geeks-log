module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    '@geeks-log',
  ],
  settings: { 'import/resolver': { typescript: {} } },
  rules: {
    'prettier/prettier': 'error',
    '@geeks-log/ban-characters': [
      'error',
      {
        bannedCharactersRegex: mergeBannedCharacters(['\u001c']),
      },
    ],
    'no-undef': 'off',
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    semi: 'off',
    'no-extra-boolean-cast': 'off',
    'getter-return': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/camelcase': ['error', { properties: 'never', ignoreDestructuring: true }],
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'prefer-const': 'error',
    'no-var': 'error',
    curly: ['error', 'all'],
    'import/no-cycle': ['error', { maxDepth: Infinity }],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'import/no-duplicates': 'error',
  },
};

function mergeBannedCharacters(chars) {
  return `(${chars.join('|')})`;
}
