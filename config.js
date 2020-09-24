const path = require('path')
const template = require('lodash/template')

// Constants
const BUILD_DIR = path.resolve(__dirname, 'build')
const SRC_DIR = path.resolve(__dirname, 'src')
const REPORTS_DIR = path.resolve(SRC_DIR, 'reports')
const REPORTS_OUTPUT_DIR = path.resolve(BUILD_DIR, 'reports')

const EXTERNAL_IMPORTS_PATH = path.resolve(SRC_DIR, 'external-imports.html')
const BASE_STYLES_PATH = path.resolve(SRC_DIR, 'base-styles.css')
const LAYOUT_PATH = path.resolve(SRC_DIR, 'layout.html')

// Report definitions
const reports = {
    mda: {
        name: 'mda',
        title: 'MDA Treatment Summary',
        dir: path.resolve(REPORTS_DIR, 'mda'),
        specificStyles: true,
    },
    dsa: {
        name: 'dsa',
        title: 'DSA Summary',
        dir: path.resolve(REPORTS_DIR, 'dsa'),
        specificStyles: false,
    },
    training: {
        name: 'training',
        title: 'Training Summary',
        dir: path.resolve(REPORTS_DIR, 'training'),
        specificStyles: false,
    },
}

// Helper functions
const getEntryPath = report => path.resolve(report.dir, `${report.name}.js`)

const getStylesPath = report =>
    path.resolve(report.dir, `${report.name}.styles.css`)

const getBuildPath = report =>
    path.resolve(BUILD_DIR, `${report.name}.bundle.js`)

const getEntries = reports => {
    console.log('TODO: Automate directory pathfinding')
    const entries = {}
    Object.entries(reports).forEach(([key, report]) => {
        entries[key] = getEntryPath(report)
    })
    // for (const report in reports) {
    //     entries[report] = getEntryPath(reports[report])
    // }
    return entries
}

// Report template
const htmlReportTemplate = `
<%= externalImports %>

<style id="base-styles"><%= baseStyles %></style>
<style id="specific-styles"><%= specificStyles %></style>

<script><%= bundle %></script>

<%= layout %>
`
const compiledReportTemplate = template(htmlReportTemplate)

module.exports = {
    BUILD_DIR,
    SRC_DIR,
    REPORTS_DIR,
    REPORTS_OUTPUT_DIR,
    EXTERNAL_IMPORTS_PATH,
    BASE_STYLES_PATH,
    LAYOUT_PATH,
    reports,
    getEntries,
    getEntryPath,
    getBuildPath,
    getStylesPath,
    compiledReportTemplate,
}
