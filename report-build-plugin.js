const fs = require('fs')
const path = require('path')
const async = require('async')

const {
    reports,
    EXTERNAL_IMPORTS_PATH,
    BASE_STYLES_PATH,
    LAYOUT_PATH,
    REPORTS_OUTPUT_DIR,
    BUILD_DIR,
    getBuildPath,
    getStylesPath,
    compiledReportTemplate,
} = require('./config')

function readFilesWriteTemplate(report, files) {
    const { name } = report

    // 1. Read file(s); get data
    async.parallel(
        {
            bundle: cb => fs.readFile(getBuildPath(report), cb),
            specificStyles: cb =>
                report.specificStyles
                    ? fs.readFile(getStylesPath(report), cb)
                    : cb(null, null),
        },
        (err, reportFiles) => {
            if (err) throw err

            // 2. Apply file data to compiled template to get string
            const outputString = compiledReportTemplate({
                externalImports: files.externalImports,
                baseStyles: files.baseStyles,
                specificStyles: reportFiles.specificStyles,
                bundle: reportFiles.bundle,
                layout: files.layout,
            })

            // 3. Write new string to new file
            fs.writeFile(
                path.resolve(BUILD_DIR, `${name}.html`),
                outputString,
                err => {
                    if (err) throw err
                    console.log(`Compiled report ${name}`)
                }
            )
        }
    )
}

class ReportBuildPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('Report Build Plugin', stats => {
            async.parallel(
                {
                    externalImports: cb =>
                        fs.readFile(EXTERNAL_IMPORTS_PATH, cb),
                    baseStyles: cb => fs.readFile(BASE_STYLES_PATH, cb),
                    layout: cb => fs.readFile(LAYOUT_PATH, cb),
                },
                (err, files) => {
                    for (const report in reports) {
                        readFilesWriteTemplate(reports[report], files)
                    }
                }
            )
        })
    }
}

module.exports = { ReportBuildPlugin }

// const { compilation } = stats

// console.log(compilation)

// for (const filename in compilation.assets) {
//     console.log(filename)
//     console.log(compilation.assets[filename].existsAt)
// }

// const outputPath = compilation.outputOptions.path
// // [name].bundle.js -- may be useful for script:
// const outputFilename = compilation.outputOptions.filename
