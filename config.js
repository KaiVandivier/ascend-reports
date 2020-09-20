const path = require('path')

const BUILD_DIR = './build'
const SRC_DIR = './src'
const REPORTS_DIR = path.resolve(SRC_DIR, 'reports')

exports.getEntryPath = report => path.resolve(report.dir, `${report.name}.js`)
exports.getStylesPath = report =>
    path.resolve(report.dir, `${report.name}.styles.css`)

exports.reports = {
    mda: {
        title: 'MDA Treatment Summary',
        name: 'mda',
        dir: path.resolve(REPORTS_DIR, 'mda'),
        specificStyles: true,
    },
    training: {
        title: 'Training Summary',
        name: 'training',
        dir: path.resolve(REPORTS_DIR, 'training'),
        specificStyles: false,
    },
}
