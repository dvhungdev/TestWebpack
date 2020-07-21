const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const bundleFileName = 'bundle';
const dirName = 'wwwroot/dist';
module.exports = (env, argv) => {
    return {
        mode: argv.mode === "production" ? "production" : "development",
        entry:{
            newfile: [
                './src/index.js',
                './src/hello.js'
              ],
              newfile2: [
                './src/index.js',
                './src/haha.js'
              ]
        },
        // ['./src/index.js', './src/sass/index.scss']

        output: {
            // filename: bundleFileName + '.js',
            filename: '[name].js',
            path: path.resolve(__dirname, dirName)
        },
        module: {
            rules: [
                {
                    test: /\.s[c|a]ss$/,
                    use:
                        [
                            'style-loader',
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    config: {
                                        ctx: {
                                            env: argv.mode
                                        }
                                    }
                                }
                            },
                            'sass-loader'
                        ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: bundleFileName + '.css'
            })
        ]
    };
};