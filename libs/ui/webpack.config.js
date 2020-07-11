const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = process.env.PORT || 6006;
const PROD = process.env.NODE_ENV === 'production';

const deployUrl = PROD ? '/' : `http://localhost:${PORT}`;

module.exports = {
  mode: PROD ? 'production' : 'development',
  entry: {
    main: './demo/main.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'demo-dist/'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: deployUrl,
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'demo/'), path.resolve(__dirname, 'src/')],
        exclude: [path.resolve(__dirname, 'node_modules/'), path.resolve(__dirname, 'demo-dist/')],
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
        include: [path.resolve(__dirname, 'demo/')],
        exclude: [path.resolve(__dirname, 'node_modules/')],
      },
    ],
  },
  devtool: PROD ? undefined : 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEPLOY_URL': JSON.stringify(deployUrl),
    }),
  ],
  devServer: {
    host: 'localhost',
    contentBase: path.resolve(__dirname, 'demo/'),
    port: PORT,
    open: false,
    historyApiFallback: true,
    stats: 'minimal',
  },
};
