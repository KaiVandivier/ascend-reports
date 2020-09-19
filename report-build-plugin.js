const fs = require('fs')

class ReportBuildPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('Report Build Plugin', stats => {
            const { compilation } = stats

            console.log(compilation)

            for (const filename in compilation.assets) {
                console.log(filename)
                console.log(compilation.assets[filename].existsAt)
            }

            const outputPath = compilation.outputOptions.path
            // [name].bundle.js -- may be useful for script:
            const outputFilename = compilation.outputOptions.filename
        })
    }
}

module.exports = { ReportBuildPlugin }
