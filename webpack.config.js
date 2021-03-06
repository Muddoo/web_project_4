const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        main: './src/page/index.js'
    },
    output: {
        publicPath: '',
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(woff2|woff)$/,
                use: 'file-loader?name=./vendor/[name].[ext]'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use:  [ 
                        MiniCssExtractPlugin.loader,
                        {
                          loader: 'css-loader',
                          options: { importLoaders: 1 }
                        },
                        'postcss-loader'
                    ]
            }
        ]
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './src/images/android-chrome.jpg',
          }),
        new MiniCssExtractPlugin()
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
}