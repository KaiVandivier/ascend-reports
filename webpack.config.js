const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { ReportBuildPlugin } = require('./report-build-plugin')

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        index1: './src/index.js',
        index2: './src/secondIndex.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [new CleanWebpackPlugin(), new ReportBuildPlugin()],
}
