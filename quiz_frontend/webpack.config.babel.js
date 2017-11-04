const path = require('path');
const webpackEnvConfig = require('./webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const webpackConfig = {
  entry: webpackEnvConfig.entry,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: webpackEnvConfig.plugins.concat([
    new FaviconsWebpackPlugin('./assets/favicon.png')
  ]),
  module:{
    rules: webpackEnvConfig.rules
  },
	resolveLoader: {
		moduleExtensions: ['-loader']
	}
};

module.exports = webpackConfig;
