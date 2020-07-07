const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        bundle: ['./src/app/index.js', './src/assets/sass/index.scss']
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve('./dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        hot: true,
        compress: true,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/assets/fonts/noto', to: 'fonts'},
                {from: 'src/assets/images', to: 'images'},
            ],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            templateParameters: {
                title: 'Yang Gallery',
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
    ]
}