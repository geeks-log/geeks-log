const defaultConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    '@babel/react',
    '@babel/typescript',
    '@emotion/babel-preset-css-prop',
  ],
  plugins: [['@babel/plugin-proposal-class-properties', { loose: true }], 'emotion'],
};

module.exports = {
  createConfig(configFactory) {
    return typeof configFactory === 'function' ? configFactory(defaultConfig) : defaultConfig;
  },
};
