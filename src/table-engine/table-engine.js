import { rowTypes, tooltipTypes } from './enums'

const { $, dhis2 } = window

/**
 *
 * App state
 *
 */

// (Ideally, initial values would be set by the reports app parameters)
// Initial period should get overwritten by `setUpPeriodSelect()`;
const currentYear = new Date().getFullYear()
const initialPeriod = currentYear
const initialOrgUnit = Object.keys(dhis2.report.organisationUnit).length
    ? dhis2.report.organisationUnit.id
    : 'GdH306UQ8L8' // This is the global org-unit

// Number format to be used in cells
const numberFormat = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
})

let state = {
    currentYear,
    period: initialPeriod,
    orgUnit: initialOrgUnit,
    numberFormat,
    rows: null,
    columns: null,
    totalColumns: null,
    // Dim. IDs, found by dimension-name lookup:
    dimensionsToQuery: [],
    // Warnings and errors to be displayed in tooltips:
    alerts: [],
}

// TODO: c'mon, you can do better than this ;)
function addRowsAndColumnsToState(rows, columns) {
    // Cell-width of table
    const totalColumns =
        1 +
        columns.reduce(
            (sum, column) => sum + (column.subcategories?.length || 1),
            0
        )

    state = { ...state, rows, columns, totalColumns }
}

function addReportTitleToState(reportTitle) {
    const csvFilename = reportTitle.toLowerCase().split(' ').join('_')
    state = { ...state, csvFilename, reportTitle }
}

/**
 *
 * Custom logic helper functions
 *
 */
export function greatestOf(...args) {
    const nums = args.filter(n => !Number.isNaN(Number(n)))
    if (!nums.length) return 0
    return Math.max(...nums)
}

export function sumOf(...args) {
    const nums = args.filter(n => !Number.isNaN(Number(n)))
    if (!nums.length) return 0
    return nums.reduce((sum, n) => sum + Number(n), 0)
}

export function multipleYearsSelected() {
    return String(state.period).split(';').length > 1
}

export function uniqueRespondingIUs(cells, options = {}) {
    // This function counts all unique IUs with at least one value in this row
    // 1. Build dimensions list for query url
    const dimensions = cells
        .filter(cell => cell && cell.dxId)
        .map(cell => cell.dxId)
        .join(';')

    // 1.1 Figure out period for query filter
    const filterPeriod =
        multipleYearsSelected() && options.showOnlyCurrentYearIfMultipleSelected
            ? state.currentYear
            : state.period

    // 2. Query analytics:
    return $.get('../api/34/analytics', {
        // Second orgunit dimension is hardcoded to IU level
        dimension: `dx:${dimensions},ou:${state.orgUnit};LEVEL-iGO9aN3ZSSi`,
        filter: `pe:${filterPeriod}`,
        skipMeta: true,
    })
        .then(json => {
            // 3. Get unique org units (IUs) with response > 0
            const uniqueOrgUnits = new Map()
            json.rows.forEach(([, orgUnitId, value]) => {
                if (!value) return

                // If this org unit is a duplicate in the list, set value to be the greater
                const existingValue = uniqueOrgUnits.get(orgUnitId)
                if (existingValue) {
                    const greaterValue = greatestOf(value, existingValue)
                    uniqueOrgUnits.set(orgUnitId, greaterValue)
                    return
                }

                // Otherwise, set value in map
                uniqueOrgUnits.set(orgUnitId, value)
            })

            // Sum response values of unique IUs
            let sumOfValues = 0
            uniqueOrgUnits.forEach(value => {
                if (Number.isNaN(Number(value))) return
                sumOfValues += Number(value)
            })
            const numUniqueIUs = uniqueOrgUnits.size

            // Create a tooltip
            const { rowIdx, idx } = options
            if (rowIdx && idx) {
                state.alerts.push({
                    identifier: 'row-cell',
                    identifierValue: `${rowIdx}-${idx}`,
                    tooltipType: tooltipTypes.INFO,
                    message:
                        'IUs that participated in multiple MDAs are not double-counted here',
                })
            }

            return { numUniqueIUs, sumOfValues }
        })
        .catch(err => {
            // Format error for later handling
            const message = `Unique IUs error${
                err.message ? ` - ${err.message}` : ''
            }`
            return Promise.reject(
                Object.assign(new Error(), { ...err, message })
            )
        })
}

/**
 *
 * Table logic
 *
 */
function getAllDimensions(filterText) {
    // Gets a list of indicators and programIndicators to match dimension names to IDs
    return Promise.all([
        $.get(
            `../api/34/programIndicators.json?filter=displayName:ilike:${filterText}&paging=false`
        ),
        $.get(
            `../api/34/indicators.json?filter=displayName:ilike:${filterText}&paging=false`
        ),
    ]).then(values => {
        const [{ programIndicators }, { indicators }] = values
        const allDimensions = [...programIndicators, ...indicators]

        const dimensionMap = new Map()
        allDimensions.forEach(dimension => {
            // Check for duplicated dimensions
            const dimensionWithSameName = dimensionMap.get(
                dimension.displayName
            )
            if (dimensionWithSameName) {
                const alert = {
                    identifier: 'dimension-name',
                    identifierValue: dimension.displayName,
                    tooltipType: tooltipTypes.WARNING,
                    message: `Duplicate dimension name found: '${dimension.displayName}'. You may not get the data you're looking for if this cell is queried by name.`,
                    persistAfterTableLoad: true,
                }
                state.alerts.push(alert)

                console.warn(
                    'Duplicate dimension name found: ',
                    dimension.displayName
                )
            }

            // As of right now, overwrite to give last-queried group precedence (i.e., indicators)
            dimensionMap.set(dimension.displayName, dimension.id)
        })
        return dimensionMap
    })
}

function populateCellDimensionIds(allDimensions) {
    // Populates dimensionId (`dxId`) on cells based on dimensionName
    // Also populates `state.dimensionsToQuery` for analytics query
    const dimensionsToQuery = []

    // Look up dimension ids by name and add ids to cells
    state.rows.forEach(({ cells }) => {
        if (!cells) return

        cells.forEach(cell => {
            if (!cell) return
            if (cell.dxId) {
                // cell already has `dimensionId`; skip ID lookup
                dimensionsToQuery.push(cell.dxId)
                return
            }
            if (!cell.dn) return
            const { dn: dimensionName } = cell

            // Find dimension in map:
            const dimensionId = allDimensions.get(dimensionName)

            if (!dimensionId) {
                if (!cell.tooltips) cell.tooltips = []
                cell.tooltips.push({
                    type: tooltipTypes.ERROR,
                    message: `Dimension not found: ${dimensionName}`,
                })
                return
            }

            // Dimension found - add it to list to query and populate cell
            dimensionsToQuery.push(dimensionId)
            cell.dxId = dimensionId
        })
    })

    state = { ...state, dimensionsToQuery }
    return dimensionsToQuery
}

function getAnalyticsData() {
    // Query analytics API for data (with one monolithic query)
    const { dimensionsToQuery, period, orgUnit } = state

    return $.get('../api/34/analytics', {
        dimension: `dx:${dimensionsToQuery.join(';')}`,
        filter: `ou:${orgUnit},pe:${period}`,
        skipMeta: true,
    })
        .then(json => {
            // convert to a map for easy lookup by ID:
            const keyValuePairs = json.rows.map(row => [row[0], row[1]])
            const resultsMap = new Map(keyValuePairs)
            return resultsMap
        })
        .catch(err => {
            // There was an error with the monolothic query. Fall back to individual queries

            // Log error and notify user
            console.warn(
                'There was an error with the monolithic query. Falling back to individual queries.',
                err
            )
            const errMsgExists = $('#errMsg').length
            if (!errMsgExists) {
                $('#loading').prepend(`
            <div id="errMsg">
              <p>Oops!  There was an error with the database query.  This report will fall back to a less efficient method to identify the error, which will take a bit longer to load than usual.</p>
              <p class="text-warning"><i class="fa fa-exclamation-triangle"></i> Warning: Please be aware that refreshing the table multiple times while the error exists can crash the server, due to a large volume of network requests.</p>
            </div>
          `)
            }

            // Query dimensions individually to sort out errors
            return getAnalyticsDataIndividually()
        })
}

function getAnalyticsDataIndividually() {
    // Query each cell individually to sort out errors
    // (This is much slower and should only be used if there is a db error in the monolothic query)
    const { dimensionsToQuery, period, orgUnit } = state

    return Promise.all(
        dimensionsToQuery.map(dimensionId => {
            // Query individual cell contents
            return $.get('../api/34/analytics', {
                dimension: `dx:${dimensionId},pe:${period}`,
                filter: `ou:${orgUnit}`,
                skipMeta: true,
            }).then(
                // If successful, return key-value pair of data
                json => {
                    if (!json.rows.length) return null
                    return [dimensionId, json.rows[0][2]]
                },
                // If unsuccessful, log error and make key-value pair of id and error message
                err => {
                    console.error(
                        `Analytics query error found for dimension ID ${dimensionId}: `,
                        err
                    )
                    const { status, statusText, responseJSON } = err
                    const errorMessage = `Query error, status ${status}: ${
                        responseJSON ? responseJSON.message : statusText
                    }`
                    state.alerts.push({
                        identifier: 'dimension-id',
                        identifierValue: dimensionId,
                        tooltipType: tooltipTypes.ERROR,
                        message: errorMessage,
                    })
                }
            )
        })
    ).then(kvPairs => {
        // Turn key-value pairs into a map for lookup during table population
        const filteredPairs = kvPairs.filter(pair => pair)
        const resultsMap = new Map(filteredPairs)
        return resultsMap
    })
}

function populateCellValues(analyticsResults) {
    // Use `dimensionId` or `customLogic` to populate `value`
    // Execute in parallel across rows
    return Promise.all(
        state.rows.map(async ({ cells }, rowIdx) => {
            if (!cells) return null // Empty row; return

            // Execute (possibly async) cell logic in _series_
            return cells
                .reduce((prevTask, cell, idx, arr) => {
                    return prevTask.then(async () => {
                        if (!cell) return
                        const { dxId: dimensionId, customLogic, options } = cell

                        if (
                            options?.omitIfMultipleYearsSelected &&
                            multipleYearsSelected()
                        ) {
                            cell.value = 'n/a'
                            state.alerts.push({
                                identifier: 'row-cell',
                                identifierValue: `${rowIdx}-${idx}`,
                                tooltipType: tooltipTypes.INFO,
                                message:
                                    'Value is omitted when multiple years are selected',
                            })
                            return
                        }

                        if (dimensionId) {
                            // Handle cell defined by dimension ID
                            const data = analyticsResults.get(dimensionId)
                            cell.value = data ?? '-'
                            return
                        }

                        // Handle cell defined by custom logic
                        if (customLogic) {
                            try {
                                cell.value = await customLogic(arr, idx, rowIdx)
                            } catch (err) {
                                // If error in custom logic, create alert
                                const message = `
                                    ${err.message || 'Custom logic error'}:
                                    ${err.status || ''} ${err.statusText || ''}.
                                    See console.
                                `
                                state.alerts.push({
                                    identifier: 'row-cell',
                                    identifierValue: `${rowIdx}-${idx}`,
                                    tooltipType: tooltipTypes.ERROR,
                                    message,
                                })
                                console.error(message, err)
                            }
                        }
                    })
                }, Promise.resolve())
                .catch(console.error.bind(console, 'Cell population error: '))
        })
    )
}

/**
 *
 * HTML Table building
 *
 */
function populateReportTitle(title) {
    $('#reportTitle').text(title)
}

function populateHtmlTableHeader() {
    // Empty cell over row names (Maybe "indicator?")
    $('#header-row').append(`<th scope="col"></th>`)
    state.columns.forEach(col => {
        const colspan = col.subcategories ? col.subcategories.length : 1
        const subheadings = col.subcategories
            ? col.subcategories.map(sc => sc.shortName)
            : null

        const newHeader = $(`
        <th scope="col" class="container" colspan="${colspan}">
          <div class="row mb-2">
            <span class="col">${subheadings ? col.name : col.shortName}</span>
          </div>
        </th>
      `)
        $('#header-row').append(newHeader)

        const bottomRow = $(`<div class="row no-gutters bottom-row"></div>`)
        newHeader.append(bottomRow)

        if (subheadings) {
            subheadings.forEach(subheading =>
                bottomRow.append(`<span class="col">${subheading}</span>`)
            )
        }
    })
}

function populateHtmlTableBodyWithValues() {
    // Clear tbody for fresh rows & remove "loading"
    const tbody = $('#tbody').empty()
    $('#loading').hide()

    // Set up table body
    state.rows.forEach((row, rowIdx) => {
        // Make new row element
        const newRow = $(
            `<tr
          data-name="${row.name}"
          data-type="${row.type}"
          class="${row.color || ''}"
        ></tr>`
        )
        // Add new row to DOM
        tbody.append(newRow)

        if (row.type === rowTypes.CATEGORY) {
            // Row is just a category label (like "Coverage Evaluation"): make one wide cell and return
            newRow.append(
                `<th scope="row" colspan="${state.totalColumns}">${row.name}</th>`
            )
            return
        }

        // Add row header with name
        newRow.append(`<th scope="row">${row.name}</th>`)
        addCellsToHtmlRow(newRow, row, rowIdx)
    })
}

function addCellsToHtmlRow(htmlRow, row, rowIdx) {
    const { cells } = row
    if (!cells || !cells.length) {
        htmlRow.append(
            `<td colspan="${
                state.totalColumns - 1
            }">No dimensions specified</td>`
        )
        return
    }

    cells.forEach((cell, idx) => {
        if (!cell) return htmlRow.append('<td></td>')

        const { dn, dxId, value } = cell
        const newCell = $(`
        <td
          ${dn ? `data-dimension-name="${dn}"` : ''}
          ${dxId ? `data-dimension-id="${dxId}"` : ''}
          data-row-cell="${rowIdx}-${idx}"
        ></td>
      `)

        // Add value and format number
        if (typeof value !== 'undefined') {
            const formattedValue = Number.isNaN(Number(value))
                ? value
                : state.numberFormat.format(Number(value))
            newCell.append(formattedValue)
        }

        // Add tooltips, if defined
        if (cell.tooltips)
            cell.tooltips.forEach(tooltip => addTooltipToCell(newCell, tooltip))
        htmlRow.append(newCell)
    })
}

function addTooltipToCell(htmlCell, { type, message }) {
    // Check if cell is valid:
    if (!htmlCell.length)
        return console.warn('Invalid html cell when adding tooltip')

    const htmlTooltip = $(
        `<i class="fa ${type.icon} ${type.color}" data-toggle="tooltip" data-title="${message}"></i>`
    )
    htmlCell.append(' ', htmlTooltip)
    htmlTooltip.tooltip()
}

function addAlertTooltips() {
    state.alerts.forEach(alert => {
        const { identifier, identifierValue, tooltipType, message } = alert
        const targetCell = $(`[data-${identifier}="${identifierValue}"`)
        if (!targetCell.length) return
        addTooltipToCell(targetCell, { type: tooltipType, message })
    })
}

function clearAlerts() {
    state.alerts = state.alerts.filter(alert => alert.persistAfterTableLoad)
}

/**
 *
 * Load the Table, populate it with data
 *
 */
function loadTableData() {
    // Prepare for new table data & show loading
    $('#tbody').empty()
    $('#loading').show()
    $('#downloadCSV').attr('disabled', true)
    $('#downloadCSV').addClass('disabled')

    // Query new data and populate table
    // TODO: update period and org unit display
    return getAnalyticsData()
        .then(populateCellValues)
        .then(populateHtmlTableBodyWithValues)
        .then(addAlertTooltips)
        .then(clearAlerts)
        .then(() => {
            $('#downloadCSV').attr('disabled', false)
            $('#downloadCSV').removeClass('disabled')
        })
}

/**
 *
 * CSV Export
 *
 */
function exportToCSV() {
    const csvPrefix = 'data:text/csv;charset=utf-8,'

    // 0. Include Org unit and period
    const {
        period,
        allYears,
        orgUnit,
        allOrgUnits,
        orgUnitPrettyString,
        csvFilename,
    } = state
    const csvOrgUnit = `Organisation Unit(s):,${
        orgUnitPrettyString || allOrgUnits.get(orgUnit)
    }\n`
    const csvPeriod = `Period(s):,${
        period === allYears ? 'All Years' : period
    }\n\n`

    // 1. Make two header rows for column title
    const colHeadersTop = [null]
    const colHeadersBot = [null]
    state.columns.forEach(column => {
        // TODO: Short names?
        // If no subcategories, enter column name on top and null on bottom.
        if (!column.subcategories) {
            colHeadersTop.push(column.name)
            colHeadersBot.push(null)
            return
        }

        // If column has subcategories, enter col name and n-1 spaces on top,
        // and all subcategories in bottom.
        column.subcategories.forEach((subcategory, idx) => {
            colHeadersTop.push(idx === 0 ? column.name : null)
            colHeadersBot.push(subcategory.name)
        })
    })
    const csvHeaders = `${colHeadersTop.join(',')}\n${colHeadersBot.join(
        ','
    )}\n`

    // 2. Map each row; join with newlines
    // 3. Map each cell; join with columns
    const csvRows = state.rows
        .map(row => {
            const formattedName = row.name.replace(/,/g, '')
            if (!row.cells) return formattedName

            const csvCells = row.cells
                .map(cell => {
                    // If cell is empty or has no value, make empty cell element
                    if (!cell || typeof cell.value === 'undefined') return null
                    const { value } = cell
                    const formattedValue = Number.isNaN(Number(value))
                        ? value.replace(/,/g, '')
                        : Number(value)
                              .toFixed(2)
                              .replace(/\.?0*$/, '')
                    return formattedValue
                })
                .join(',')
            return `${formattedName},${csvCells}`
        })
        .join('\n')

    // 4. Combine all strings
    const csvContent = csvPrefix + csvOrgUnit + csvPeriod + csvHeaders + csvRows

    // 5. Encode URI; make invisible link then download
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${csvFilename}.csv`)
    window.frameElement.parentNode.appendChild(link) // Bypasses chrome sandboxed iframe restrictions

    link.click() // This will download the data file named "${csvFilename}.csv".
}

function addCsvDownloadListener() {
    $('#downloadCSV').on('click', exportToCSV)
}

/**
 *
 * Period & Org Unit selection
 *
 */
function setUpPeriodCheckboxes(startingYear) {
    // Populate period checkboxes, including "all years"
    const { currentYear } = state

    const allYears = []
    for (let year = currentYear; year >= startingYear; year -= 1) {
        allYears.push(year)
    }
    const allYearsString = allYears.join(';')
    state = { ...state, allYears: allYearsString }

    const checkboxes = $('#periodCheckboxes')
    allYears.forEach(year => {
        checkboxes.append(`
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="${year}"
            name="period"
            id="${year}"
            ${year === currentYear ? 'checked' : ''}
          />
          <label class="form-check-label" for="${year}">
            ${year}
          </label>
        </div>
      `)
    })

    checkboxes.append(`
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="${allYearsString}"
          name="period"
          id="${allYearsString}"
        />
        <label class="form-check-label" for="${allYearsString}">
          All Years
        </label>
      </div>
    `)
}

function getOrgUnitCheckbox({
    id,
    displayName,
    checked = false,
    indented = false,
}) {
    return `
        <div class="form-check${indented ? ' ml-3' : ''}">
            <input
                class="form-check-input"
                type="checkbox"
                value="${id}"
                name="orgUnit"
                id="${id}"
                ${checked ? 'checked' : ''}
            />
            <label class="form-check-label" for="${id}">
                ${displayName}
            </label>
        </div>
    `
}

function setUpOrgUnitCheckboxes(maxLevel) {
    // Slight refactor, to look like a tree:
    // select level 1 orgUnits and get children
    // render parents; for each parent, render children indented
    $.get('../api/34/organisationUnits.json', { maxLevel, paging: false })
        .then(({ organisationUnits: orgUnits }) => {
            if (!orgUnits) return

            const orgUnitCheckboxes = $('#orgUnitCheckboxes')

            const allOrgUnits = new Map()
            orgUnits.forEach(({ id, displayName }, idx) => {
                // Set first orgUnit to state (should be global org unit)
                if (idx === 0) state = { ...state, orgUnit: id }

                allOrgUnits.set(id, displayName)
                orgUnitCheckboxes.append(
                    getOrgUnitCheckbox({
                        id,
                        displayName,
                        checked: idx === 0,
                    })
                )
            })

            state = { ...state, allOrgUnits }
        })
        .catch(console.error)
}

function handleFormSubmit(e) {
    e.preventDefault()

    // Parse out input values
    const eles = document.querySelector('#filterForm').elements
    const checkboxes = [...eles].filter(ele => ele.type === 'checkbox')

    const periodCheckboxValues = checkboxes
        .filter(checkbox => checkbox.name === 'period')
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value)
    const orgUnitCheckboxValues = checkboxes
        .filter(checkbox => checkbox.name === 'orgUnit')
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value)

    // Check for valid query parameters
    $('#filterForm .alert').remove()
    if (!periodCheckboxValues.length || !orgUnitCheckboxValues.length) {
        $('#filterForm').prepend(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          At least one of each parameter below must be selected.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `)
        return
    }

    // Format filter parameters
    const periodFilterString = periodCheckboxValues.join(';')
    const periodPrettyString = periodCheckboxValues
        .map(period => (period === state.allYears ? 'All Years' : period))
        .join(', ')
    const orgUnitFilterString = orgUnitCheckboxValues.join(';')
    const orgUnitPrettyString = orgUnitCheckboxValues
        .map(orgUnitId => state.allOrgUnits.get(orgUnitId))
        .join(', ')

    // TODO: Save values as array to format later

    // Update state
    state = {
        ...state,
        period: periodFilterString,
        orgUnit: orgUnitFilterString,
        periodPrettyString,
        orgUnitPrettyString,
    }
    // Load table
    loadTableData()
    // Close dropdown
    $('.dropdown-toggle').dropdown('toggle')
}

function setUpCheckboxForm({ startingYear, maxOrgUnitLevel }) {
    setUpPeriodCheckboxes(startingYear)
    setUpOrgUnitCheckboxes(maxOrgUnitLevel)

    // Use button because forms cannot submit in sandboxed iframes
    $('#updateTable').on('click', handleFormSubmit)
}

/**
 *
 * Page-load execution
 *
 */
// jQuery(document).ready(function () {
export function createTable({
    rows,
    columns,
    reportTitle,
    dimensionFilterText,
}) {
    // Javascript to be executed after page is loaded here
    addRowsAndColumnsToState(rows, columns)
    setUpCheckboxForm({ startingYear: 2010, maxOrgUnitLevel: 2 })
    populateReportTitle(reportTitle)
    addReportTitleToState(reportTitle)
    addCsvDownloadListener()
    populateHtmlTableHeader()
    getAllDimensions(dimensionFilterText)
        .then(populateCellDimensionIds)
        .then(loadTableData)
        .catch(console.error)
}
