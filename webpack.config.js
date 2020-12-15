const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/scripts/page/index.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif|woff2)$/,
                use: 'file-loader'
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
        new HtmlWebpackPlugin({
            template: './src/index.html' 
          }),
        new MiniCssExtractPlugin()
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
}