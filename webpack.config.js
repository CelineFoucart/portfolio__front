const path = require('path');

module.exports = {
    mode: 'production',
    entry: "./src/script.js",
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: "bundle.js"
    },
    // devtool: "source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: [/node_modules/, /tests/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { 
                                targets: "defaults",
                                useBuiltIns: 'usage',
                                corejs: 3 
                            }]
                        ]
                    }
                }
            }
        ]
    }
}