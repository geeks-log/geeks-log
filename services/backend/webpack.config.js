const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const { HotModuleReplacementPlugin, WatchIgnorePlugin } = webpack;

module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
  },
  stats: 'minimal',
  plugins: [new HotModuleReplacementPlugin(), new WatchIgnorePlugin([/\.js$/, /\.d\.ts$/])],
  output: {
    path: path.join(__dirname, 'dev-dist'),
    filename: 'dev.js',
  },
};
