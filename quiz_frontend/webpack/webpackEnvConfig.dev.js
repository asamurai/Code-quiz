const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const config = require('./../config');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${config.devServer.host}:${config.devServer.port}`,
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    rules: [
        {
            enforce: 'pre',
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'eslint-loader'
        },
        {
            test: (/\.(scss|sass)$/), 
            use: [
                'style-loader',    
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        sourceMap: true
                    }
                },
                'sass-loader'
            ]
        },
        {
            test: (/\.(js|jsx)$/),
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /\.json$/,
            use: 'json-loader'
        },
        {
            test: /\.(jpe?g|png|gif|svg|ico)$/i,
            use: 'file-loader?name=[name].[ext]'
        },
        { 
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }
    ],
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new DirectoryNamedWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'Project',
            template: path.resolve(__dirname, '../assets/views/index-template.ejs'),
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
}

