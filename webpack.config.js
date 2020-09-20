const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { ReportBuildPlugin } = require('./report-build-plugin')
const { reports, getEntries, BUILD_DIR } = require('./config')

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: getEntries(reports),
    output: {
        filename: '[name].bundle.js',
        path: BUILD_DIR,
    },
    plugins: [new CleanWebpackPlugin(), new ReportBuildPlugin()],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js'],
    },
}
