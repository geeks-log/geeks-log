const defaultConfig = {
  presets: [
    [
      require('@babel/preset-env'),
      {
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
  ],
  plugins: [
    [require('@babel/plugin-proposal-class-properties'), { loose: true }],
    require('@babel/plugin-proposal-optional-chaining'),
    require('@babel/plugin-proposal-nullish-coalescing-operator'),
    require('@babel/plugin-proposal-numeric-separator'),
  ],
};

module.exports = {
  createConfig(options = {}) {
    const { withReact = false, withTypescript = true, withEmotion = false, extraConfigs } = options;
    const config = { ...defaultConfig };

    if (withReact) {
      config.presets.push(require('@babel/preset-react'));
    }

    if (withTypescript) {
      config.presets.push(require('@babel/preset-typescript'));
    }

    if (withEmotion) {
      config.presets.push(require('@emotion/babel-preset-css-prop'));
      config.plugins.push(require('babel-plugin-emotion'));
    }

    return typeof extraConfigs === 'function' ? extraConfigs(config) : config;
  },
};
