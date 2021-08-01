const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => ({
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|j?g|svg|gif|ico)?$/,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: `./.env${env.file ? `.${env.file}` : ''}`,
        }),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
            favicon: './public/favicon.ico',
        }),
    ],
});
