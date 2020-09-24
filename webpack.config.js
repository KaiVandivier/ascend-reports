const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { ReportBuildPlugin } = require('./report-build-plugin')
const { reports, getEntries, BUILD_DIR } = require('./config')

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
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
                // TODO: Add 'eslint-loader' as second parser
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js'],
    },
}
