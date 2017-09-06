const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.babel');
const config = require('./config');

const ENV = process.env.NODE_ENV || 'development';

new webpackDevServer(webpack(webpackConfig), {
  noInfo: true,
  contentBase: path.join(__dirname, 'dist'),
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true,
  compress: true,
  hot: true,
  open: true,
  openPage: '',
  inline: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    colors: true,
    minimal: true
  }
})
.listen(config.devServer.port, config.devServer.host, function (err) {
  if(err) {
    console.error(err);
  }else{
    console.log(`Environment: ${ENV}`);
    console.info(`Listening on http://${config.devServer.host}:${config.devServer.port}/`);
  }
});