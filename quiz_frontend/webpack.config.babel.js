const path = require('path');

const config = require('./config');
const webpackEnvConfig = require('./webpack');

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
  plugins: webpackEnvConfig.plugins,
  module:{
    rules: webpackEnvConfig.rules
  },
	resolveLoader: {
		moduleExtensions: ['-loader']
	}
};

module.exports = webpackConfig;
