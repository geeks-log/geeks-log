module.exports = {
  addons: [
    '@storybook/preset-typescript',
    // path.resolve(__dirname, './postcss.preset.js'),
    // '@storybook/addon-docs',
    // '@storybook/addon-storysource',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-viewport/register',
  ],
  stories: ['../src/**/*.stories.(ts|tsx)'],
};
