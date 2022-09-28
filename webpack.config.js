const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
    return {
        mode: (env.EnvMode === "prod") ? "production" : "development",
        devtool: 'source-map',

        entry: {
            bundle: path.resolve(__dirname, 'src/index.js'),
        },

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name][contenthash].js',
            clean: true,
            assetModuleFilename: 'assets/[name][ext]',
        },

        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist')
            },
            port: 3001,
            open: true,
            hot: true,
            compress: true,
            historyApiFallback: true,
        },

        module: {
            rules: [
                {
                    test: /.(scss|css)$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(svg|png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource'
                }
            ]
        },

        optimization: {
            minimizer: [
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: {
                                    removeAll: true
                                }
                            }
                        ]
                    }
                }),

                new TerserPlugin(),
            ],
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'bundle[contenthash].css'
            }),

            new HtmlWebpackPlugin({
                title: 'Anker',
                filename: 'index.html',
                template: 'src/template.html'
            }),
        ]
    }
}
