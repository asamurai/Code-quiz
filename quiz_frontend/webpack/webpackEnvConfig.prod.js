const path = require('path');
const webpack = require('webpack');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js',
    ],
    rules: [
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
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'Project',
            template: path.resolve(__dirname, '../assets/views/index-template.ejs'),
            filename: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
}
