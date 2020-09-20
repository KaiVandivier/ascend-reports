const template = require('lodash/template')
const fs = require('fs')
const async = require('async')

const { reports } = require('./config')

// TODO: Better match these names to input file
// Also, move to config
const htmlTemplate = `
<%= externalImports %>

<style id="base-styles"><%= baseStyles %></style>
<style id="specific-styles"><%= specificStyles %></style>

<script><%= bundle %></script>

<%= layout %>
`
const compiled = template(htmlTemplate)

// TODO:
// Read generic files: external imports, base styles
// For each report:
// - Read specific files: styles, js bundle, template
// - Create output string using template

// TODO: Make constants of these filenames in config
// async.parallel(
//     {
//         externalImports: cb => fs.readFile('src/external-imports.html', cb),
//         baseStyles: cb => fs.readFile('src/base-styles.css', cb),
//         layout: cb => fs.readFile('src/layout.html', cb)
//     },
//     (err, files) => {
//         for (const report in reports) {
//             readFilesWriteTemplate(reports[report], files)
//         }
//     }
// )

function readFilesWriteTemplate(report, files) {
    const { name } = report
    // TODO: Get specific styles to (using async parallel)
    // TODO: Point to bundled file
    // 1. Read file(s); get data
    fs.readFile(`src/${name}/${name}.js`, (err, data) => {
        if (err) throw err

        // 2. Apply file data to compiled template to get string
        const outputString = compiled({
            externalImports: files.externalImports,
            baseStyles: files.baseStyles,
            specificStyles: 'body { color: blue; }',
            bundle: data,
            layout: files.layout,
        })

        // 3. Write new string to new file
        fs.writeFile(`build/${name}.html`, outputString, err => {
            if (err) throw err
            console.log('done!')
        })
    })
}

fs.readFile('not/a/file', console.log)
