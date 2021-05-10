const path = require('path');
// const HtmlWebpackPlugin=require('html-webpack-plugin')
// const CopyPlugin=require('copy-webpack-plugin')
// const {CleanWebpackPlugin}=require('clean-webpack-plugin')
// const MiniCssExtractPlugin= require('mini-css-extract-plugin')
module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename:'assets/[hash][ext]',
    },
    module: {
        rules:[
            {
                test:/\.[tj]s$/,
                use:'ts-loader',
                exclude: /node-modules/,
            },
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: 'asset/resource',
            // },
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/i,
            //     type: 'asset/resource',
            // },
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader", "sass-loader",'sass-loader']
            // },
        ]
    },
    resolve: {
        extensions:['.ts','js']
    },
    // plugins:[
    //   new HtmlWebpackPlugin({
    //       // title:'match-match-game',
    //       template:'./src/index.html'
    //   }),
    //     new MiniCssExtractPlugin({
    //         filename:'[name].[contenthash].css',
    //     }),
    //     new CopyPlugin({
    //         patterns: [
    //             {from: './public'}
    //         ],
    //         },
    //         ),
    //     new CleanWebpackPlugin({cleanStaleWebpackAssets:false})
    // ],
};