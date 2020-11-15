# Ascend Reports

These are a group of reports for the KIT and ASCEND organisations which are designed to display analytics data which required custom handling and several dynamic features.

This project uses a custom webpack build script to compile multi-file, module-based javascript projects, CSS, and HTML into a single HTML file for uploading to the DHIS reports app.

To generate upload-ready HTML files, use `npm run build` to output the report files to the `build/` directory.

To create a new table to compile, add its row and column definitions to a new folder in the `src/reports` directory and add its information to `config.js`.
