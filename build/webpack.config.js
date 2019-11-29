const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackplugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    // 入口
    entry: {
        main: './src/index.js' // 等价于 entry：'./src/index.js'
    },
    // 出口
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [{
                test: /\.jsx?/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: 'babel-loader'
            },
            {
                test: /\.css/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    'style-loader',
                    'css-loader' // loader是从下到上，从右到左
                ]
            }
        ]
    },
    // 代码模块路径解析的配置
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, 'src')
        ],
        extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
    },
    plugins: [
        // 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
        new UglifyPlugin(),
        new HtmlWebpackplugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: 'assets/index.html' // 配置文件模板，（生成的html文件会自动引入打包生成的bundle.js文件）
        })
    ]
}