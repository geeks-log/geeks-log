const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const PORT = process.env.PORT || 4200;
const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  mode: PROD ? 'production' : 'development',
  entry: './demo/main.tsx',
  output: {
    path: path.resolve(__dirname, 'demo-dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src/'), path.resolve(__dirname, 'demo/')],
        exclude: [
          path.resolve(__dirname, 'node_modules/'),
          path.resolve(__dirname, 'dist/'),
          path.resolve(__dirname, 'esm/'),
          path.resolve(__dirname, 'demo-dist/'),
        ],
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
        include: [path.resolve(__dirname, 'src/'), path.resolve(__dirname, 'demo/')],
        exclude: [path.resolve(__dirname, 'node_modules/')],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
    }),
    new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, 'tsconfig.json'),
    }),
  ],
  devServer: {
    host: 'localhost',
    port: PORT,
    open: false,
    historyApiFallback: true,
    stats: 'minimal',
  },
};
