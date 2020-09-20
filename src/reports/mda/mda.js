// Enums for table
const colSubcats = Object.freeze({
    ROUND_1: { name: 'Round 1', shortName: 'R1' },
    ROUND_2: { name: 'Round 2', shortName: 'R2' },
    TOTAL: { name: 'Total', shortName: 'Tot.' },
})
const rowTypes = Object.freeze({
    CATEGORY: 'category',
    DATA: 'data',
})
const rowColors = Object.freeze({
    ENDEMICITY: 'yellow',
    TARGETS: 'blue',
    COVERAGE: 'pink',
    COVERAGE_EVALUATION: 'green',
    LNOB: 'lilac',
})
const tooltipTypes = Object.freeze({
    INFO: { name: 'info', icon: 'fa-info-circle', color: 'text-secondary' },
    ERROR: {
        name: 'error',
        icon: 'fa-exclamation-circle',
        color: 'text-danger',
    },
    WARNING: {
        name: 'warning',
        icon: 'fa-exclamation-triangle',
        color: 'text-warning',
    },
})

/**
 * Row and column definitions: Edit these to define the table.
 * See the documentation at https://github.com/KaiVandivier/ascend-mda-report
 * for a guide.
 */
const columns = [
    {
        name: 'Trachoma',
        shortName: 'Trach.',
        subcategories: null,
    },
    {
        name: 'Lymphatic Filariasis',
        shortName: 'L.F.',
        subcategories: null,
    },
    {
        name: 'Onchocerciasis',
        shortName: 'Oncho.',
        subcategories: [
            colSubcats.ROUND_1,
            colSubcats.ROUND_2,
            colSubcats.TOTAL,
        ],
    },
    {
        name: 'Schistosomiasis',
        shortName: 'Schisto.',
        subcategories: [
            colSubcats.ROUND_1,
            colSubcats.ROUND_2,
            colSubcats.TOTAL,
        ],
    },
    {
        name: 'S.T. Helminthiasis',
        shortName: 'STH',
        subcategories: [
            colSubcats.ROUND_1,
            colSubcats.ROUND_2,
            colSubcats.TOTAL,
        ],
    },
    {
        name: 'Grand Total',
        shortName: 'Grand Total',
        subcategories: null,
    },
]

const rows = [
    // Endemicity
    { name: 'Endemicity', type: rowTypes.CATEGORY },
    {
        name: 'Endemic IUs',
        type: rowTypes.DATA,
        color: rowColors.ENDEMICITY,
        cells: [
            { dn: 'TCMDA - Endemic IUs' },
            { dn: 'LFMDA - Endemic IUs' },
            null,
            null,
            { dn: 'OMDA - Endemic IUs' },
            null,
            null,
            { dn: 'SCMDA - Endemic IUs' },
            null,
            null,
            { dn: 'STMDA - Endemic IUs' },
            null,
        ],
    },
    {
        name: 'IUs which reached the criteria to stop MDA',
        type: rowTypes.DATA,
        color: rowColors.ENDEMICITY,
        cells: [
            {
                dn: 'TCMDA - IUs which reached the criteria to stop MDA',
            },
            {
                dn: 'LFMDA - IUs which reached the criteria to stop MDA',
            },
            null,
            null,
            {
                dn: 'OMDA - IUs which reached the criteria to stop MDA',
            },
            null,
            null,
            {
                dn: 'SCMDA - IUs which reached the criteria to stop MDA',
            },
            null,
            null,
            {
                dn: 'STMDA - IUs which reached the criteria to stop MDA',
            },
            null,
        ],
    },
    {
        name: 'IUs in post-treatment surveillance',
        type: rowTypes.DATA,
        color: rowColors.ENDEMICITY,
        cells: [
            { dn: 'TCMDA - IUs in post-treatment surveillance' },
            { dn: 'LFMDA - IUs in post-treatment surveillance' },
            null,
            null,
            { dn: 'OMDA - IUs in post-treatment surveillance' },
            null,
            null,
            { dn: 'SCMDA - IUs in post-treatment surveillance' },
            null,
            null,
            { dn: 'STMDA - IUs in post-treatment surveillance' },
            {
                customLogic: cells =>
                    uniqueRespondingIUs(cells).then(
                        ({ numUniqueIUs }) => numUniqueIUs
                    ),
                tooltips: [
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'IUs that participated in multiple MDAs are not double-counted here',
                    },
                ],
            },
        ],
    },
    {
        name: 'IUs eligible for post MDA surveillance phase',
        type: rowTypes.DATA,
        color: rowColors.ENDEMICITY,
        cells: [
            {
                dn: 'TCMDA - IUs eligible for post MDA surveillance phase',
            },
            {
                dn: 'LFMDA - IUs eligible for post MDA surveillance phase',
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                customLogic: (cells, idx) =>
                    uniqueRespondingIUs(cells).then(
                        ({ sumOfValues }) => sumOfValues
                    ),
                tooltips: [
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'IUs that participated in multiple MDAs are not double-counted here',
                    },
                ],
            },
        ],
    },
    {
        name: 'IUs where NTD endemicity is unknown',
        type: rowTypes.DATA,
        color: rowColors.ENDEMICITY,
        cells: [
            { dn: 'TCMDA - IUs where NTD endemicity is unknown' },
            { dn: 'LFMDA - IUs where NTD endemicity is unknown' },
            null,
            null,
            { dn: 'OMDA - IUs where NTD endemicity is unknown' },
            null,
            null,
            { dn: 'SCMDA - IUs where NTD endemicity is unknown' },
            null,
            null,
            { dn: 'STMDA - IUs where NTD endemicity is unknown' },
            {
                customLogic: cells =>
                    uniqueRespondingIUs(cells).then(
                        ({ numUniqueIUs }) => numUniqueIUs
                    ),
                tooltips: [
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'IUs that participated in multiple MDAs are not double-counted here',
                    },
                ],
            },
        ],
    },
    {
        name: 'Population in NTD affected IUs',
        type: rowTypes.DATA,
        color: rowColors.ENDEMICITY,
        cells: [
            { dn: 'TCMDA - Population in NTD affected IUs' },
            { dn: 'LFMDA - Population in NTD affected IUs' },
            { dn: 'OMDA - Population in NTD affected IUs Round 1' },
            { dn: 'OMDA - Population in NTD affected IUs Round 2' },
            { dn: 'OMDA - Population in NTD affected IUs Total' },
            { dn: 'SCMDA - Population in NTD affected IUs Round 1' },
            { dn: 'SCMDA - Population in NTD affected IUs Round 2' },
            { dn: 'SCMDA - Population in NTD affected IUs Total' },
            { dn: 'STMDA - Population in NTD affected IUs Round 1' },
            { dn: 'STMDA - Population in NTD affected IUs Round 2' },
            { dn: 'STMDA - Population in NTD affected IUs Total' },
            {
                customLogic: (cells, idx) =>
                    uniqueRespondingIUs(cells).then(
                        ({ sumOfValues }) => sumOfValues
                    ),
                options: { omitIfMultipleYearsSelected: true },
                tooltips: [
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'IUs that participated in multiple MDAs are not double-counted here',
                    },
                ],
            },
        ],
    },
    {
        name: 'IUs eligible for pre-TAS surveys',
        type: rowTypes.DATA,
        color: rowColors.ENDEMICITY,
        cells: [
            null,
            { dn: 'LFMDA - IUs eligible for pre-TAS surveys' },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ],
    },
    {
        name: 'IUs eligible for TAS/IA surveys',
        type: rowTypes.DATA,
        color: rowColors.ENDEMICITY,
        cells: [
            { dn: 'TCMDA - IUs eligible for TAS/IA surveys' },
            { dn: 'LFMDA - IUs eligible for TAS/IA surveys' },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ],
    },

    // Targets
    { name: 'Targets', type: rowTypes.CATEGORY },
    {
        name: 'Total Population of IUs',
        type: rowTypes.DATA,
        color: rowColors.TARGETS,
        cells: [
            { dn: 'TCMDA - Total Population of IUs' },
            { dn: 'LFMDA - Total Population of IUs' },
            null,
            null,
            { dn: 'OMDA - Total Population of IUs' },
            null,
            null,
            { dn: 'SCMDA - Total Population of IUs' },
            null,
            null,
            { dn: 'STMDA - Total Population of IUs' },
            {
                customLogic: (cells, idx) =>
                    uniqueRespondingIUs(cells, {
                        showOnlyCurrentYearIfMultipleSelected: true,
                    }).then(({ sumOfValues }) => sumOfValues),
                tooltips: [
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'IUs that participated in multiple MDAs are not double-counted here',
                    },
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'If multiple years are selected, this value reflects only the current year',
                    },
                ],
            },
        ],
    },
    {
        name: 'Population eligible for MDA treatment',
        type: rowTypes.DATA,
        color: rowColors.TARGETS,
        cells: [
            { dn: 'TCMDA - Population eligible for MDA treatment' },
            { dn: 'LFMDA - Population eligible for MDA treatment' },
            {
                dn: 'OMDA - Population eligible for MDA treatment Round 1',
            },
            {
                dn: 'OMDA - Population eligible for MDA treatment Round 2',
            },
            { dn: 'OMDA - Population eligible for MDA treatment Total' },
            {
                dn: 'SCMDA - Population eligible for MDA treatment Round 1',
            },
            {
                dn: 'SCMDA - Population eligible for MDA treatment Round 2',
            },
            {
                // Note that this is a regular Indicator (not program indic.)
                dn: 'SCMDA - Total Population eligible for MDA treatment',
            },
            {
                dn: 'STMDA - Population eligible for MDA treatment Round 1',
            },
            {
                dn: 'STMDA - Population eligible for MDA treatment Round 2',
            },
            {
                dn: 'STMDA - Population eligible for MDA treatment Total',
            },
            {
                customLogic: (cells, idx) =>
                    uniqueRespondingIUs(cells).then(
                        ({ sumOfValues }) => sumOfValues
                    ),
                options: { omitIfMultipleYearsSelected: true },
                tooltips: [
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'IUs that participated in multiple MDAs are not double-counted here',
                    },
                ],
            },
        ],
    },
    {
        name: 'Estimated size of populations with high risk of infection',
        type: rowTypes.DATA,
        color: rowColors.TARGETS,
        cells: [
            {
                dn:
                    'TCMDA - Estimated size of populations with high risk of infection',
            },
            {
                dn:
                    'LFMDA - Estimated size of populations with high risk of infection',
            },
            {
                dn:
                    'OMDA - Estimated size of populations with high risk of infection Round 1',
            },
            {
                dn:
                    'OMDA - Estimated size of populations with high risk of infection Round 2',
            },
            {
                dn:
                    'OMDA - Total Estimated size of populations with high risk of infection',
            },
            {
                dn:
                    'SCMDA - Estimated size of populations with high risk of infection Round 1',
            },
            {
                dn:
                    'SCMDA - Estimated size of populations with high risk of infection Round 2',
            },
            {
                dn:
                    'SCMDA - Total Estimated size of populations with high risk of infection',
            },
            {
                dn:
                    'STMDA - Estimated size of populations with high risk of infection Round 1',
            },
            {
                dn:
                    'STMDA - Estimated size of populations with high risk of infection Round 2',
            },
            {
                dn:
                    'STMDA - Total Estimated size of populations with high risk of infection',
            },
            {
                customLogic: (cells, idx) =>
                    uniqueRespondingIUs(cells).then(
                        ({ sumOfValues }) => sumOfValues
                    ),
                options: { omitIfMultipleYearsSelected: true },
                tooltips: [
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'IUs that participated in multiple MDAs are not double-counted here',
                    },
                ],
            },
        ],
    },

    // Coverage
    { name: 'Coverage', type: rowTypes.CATEGORY },
    {
        name: 'Geographic Coverage',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            { dn: 'TCMDA - Geographic Coverage' },
            { dn: 'LFMDA - Geographic Coverage' },
            null,
            null,
            { dn: 'OMDA - Geographic Coverage' },
            null,
            null,
            { dn: 'SCMDA - Geographic Coverage' },
            null,
            null,
            { dn: 'STMDA - Geographic Coverage' },
            null,
        ],
    },
    {
        name: 'Program Coverage',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            { dn: 'TCMDA - Program Coverage' },
            { dn: 'LFMDA - Program Coverage' },
            { dn: 'OMDA - Program Coverage Round 1' },
            { dn: 'OMDA - Program Coverage Round 2' },
            null,
            { dn: 'SCMDA - Program Coverage Round 1' },
            { dn: 'SCMDA - Program Coverage Round 2' },
            null,
            { dn: 'STMDA - Program Coverage Round 1' },
            { dn: 'STMDA - Program Coverage Round 2' },
            null,
            null,
        ],
    },
    {
        name: 'Epidemiological Coverage',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            { dn: 'TCMDA - Epidemiological Coverage' },
            { dn: 'LFMDA - Epidemiological Coverage' },
            { dn: 'OMDA - Epidemiological Coverage Round 1' },
            { dn: 'OMDA - Epidemiological Coverage Round 2' },
            null,
            { dn: 'SCMDA - Epidemiological Coverage Round 1' },
            { dn: 'SCMDA - Epidemiological Coverage Round 2' },
            null,
            { dn: 'STMDA - Epidemiological Coverage Round 1' },
            { dn: 'STMDA - Epidemiological Coverage Round 2' },
            null,
            null,
        ],
    },
    {
        name: 'IUs reaching targeted program coverage',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            { dn: 'TCMDA - IUs reaching targeted program coverage' },
            { dn: 'LFMDA - IUs reaching targeted program coverage' },
            { dn: 'OMDA - IUs reaching targeted program coverage Round 1' },
            { dn: 'OMDA - IUs reaching targeted program coverage Round 2' },
            null,
            { dn: 'SCMDA - IUs reaching targeted program coverage Round 1' },
            { dn: 'SCMDA - IUs reaching targeted program coverage Round 2' },
            null,
            { dn: 'STMDA - IUs reaching targeted program coverage Round 1' },
            { dn: 'STMDA - IUs reaching targeted program coverage Round 2' },
            null,
            null,
        ],
    },
    {
        name:
            'IUs reaching target therapeutic coverage within populations with high risk of infection',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            {
                dn:
                    'TCMDA - IUs reaching target therapeutic coverage within populations with high risk of infection',
            },
            {
                dn:
                    'LFMDA - IUs reaching target therapeutic coverage within populations with high risk of infection',
            },
            {
                dn:
                    'OMDA - IUs reaching target therapeutic coverage within populations with high risk of infection Round 1',
            },
            {
                dn:
                    'OMDA - IUs reaching target therapeutic coverage within populations with high risk of infection Round 2',
            },
            null,
            {
                dn:
                    'SCMDA - IUs reaching target therapeutic coverage within populations with high risk of infection Round 1',
            },
            {
                dn:
                    'SCMDA - IUs reaching target therapeutic coverage within populations with high risk of infection Round 2',
            },
            null,
            {
                dn:
                    'STMDA - IUs reaching target therapeutic coverage within populations with high risk of infection Round 1',
            },
            {
                dn:
                    'STMDA - IUs reaching target therapeutic coverage within populations with high risk of infection Round 2',
            },
            null,
            null,
        ],
    },
    {
        name: 'IUs where MDA treatment has been provided',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            { dn: 'TCMDA - IUs where MDA treatment has been provided' },
            { dn: 'LFMDA - IUs where MDA treatment has been provided' },
            { dn: 'OMDA - IUs where MDA treatment has been provided Round 1' },
            { dn: 'OMDA - IUs where MDA treatment has been provided Round 2' },
            null,
            { dn: 'SCMDA - IUs where MDA treatment has been provided Round 1' },
            { dn: 'SCMDA - IUs where MDA treatment has been provided Round 2' },
            null,
            { dn: 'STMDA - IUs where MDA treatment has been provided Round 1' },
            { dn: 'STMDA - IUs where MDA treatment has been provided Round 2' },
            null,
            {
                customLogic: (cells, idx) =>
                    uniqueRespondingIUs(cells).then(
                        ({ sumOfValues }) => sumOfValues
                    ),
                options: { omitIfMultipleYearsSelected: true },
                tooltips: [
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'IUs that participated in multiple MDAs are not double-counted here',
                    },
                ],
            },
        ],
    },
    {
        name: 'MDA treatments distributed to high risk populations',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            {
                dn:
                    'TCMDA - People from marginalized groups (LNOB) receiving NTD MDA treatment',
            },
            {
                dn:
                    'LFMDA - MDA treatments distributed to high risk populations',
            },
            {
                dn:
                    'OMDA - MDA treatments distributed to high risk populations Round 1',
            },
            {
                dn:
                    'OMDA - MDA treatments distributed to high risk populations Round 2',
            },
            {
                dn:
                    'OMDA - Total People from marginalized groups (LNOB) receiving NTD MDA treatment',
            },
            {
                dn:
                    'SCMDA - MDA treatments distributed to high risk populations Round 1',
            },
            {
                dn:
                    'SCMDA - MDA treatments distributed to high risk populations Round 2',
            },
            {
                dn:
                    'SCMDA - Total People from marginalized groups (LNOB) receiving NTD MDA treatment',
            },
            {
                dn:
                    'STMDA - MDA treatments distributed to high risk populations Round 1',
            },
            {
                dn:
                    'STMDA - MDA treatments distributed to high risk populations Round 2',
            },
            {
                dn:
                    'STMDA - Total People from marginalized groups (LNOB) receiving NTD MDA treatment',
            },
            {
                dn:
                    'MDA - Total MDA treatments distributed to high risk populations',
            },
        ],
    },
    {
        name: 'Number of PC treatments provided per IU',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            { dn: 'TCMDA - Total Persons Treated' },
            { dn: 'LFMDA - Total Persons Treated' },
            { dn: 'OMDA - Total Persons Treated Round 1' },
            { dn: 'OMDA - Total Persons Treated Round 2' },
            { dn: 'OMDA - Total Persons Treated Round 1 AND 2' },
            { dn: 'SCMDA - Total Persons Treated Round 1' },
            { dn: 'SCMDA - Total Persons Treated Round 2' },
            { dn: 'SCMDA - Total Persons Treated Round 1 AND 2' },
            { dn: 'STMDA - Total Persons Treated Round 1' },
            { dn: 'STMDA - Total Persons Treated Round 2' },
            { dn: 'STMDA - Total Persons Treated Round 1 AND 2' },
            { dn: 'MDA - Total PC treatments provided' },
        ],
    },
    {
        name: 'IUs where MDA campaigns were conducted',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            { dn: 'TCMDA - IUs where MDA campaigns were conducted' },
            { dn: 'LFMDA - IUs where MDA campaigns were conducted' },
            { dn: 'OMDA - IUs where MDA campaigns were conducted Round 1' },
            { dn: 'OMDA - IUs where MDA campaigns were conducted Round 2' },
            { dn: 'OMDA - Total IUs where MDA campaigns were conducted' },
            { dn: 'SCMDA - IUs where MDA campaigns were conducted Round 1' },
            { dn: 'SCMDA - IUs where MDA campaigns were conducted Round 2' },
            { dn: 'SCMDA - Total IUs where MDA campaigns were conducted' },
            { dn: 'STMDA - IUs where MDA campaigns were conducted Round 1' },
            { dn: 'STMDA - IUs where MDA campaigns were conducted Round 2' },
            { dn: 'STMDA - Total IUs where MDA campaigns were conducted' },
            null,
        ],
    },
    {
        name: 'IUs reaching required therapeutic coverage',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            { dn: 'TCMDA - IUs reaching required therapeutic coverage' },
            { dn: 'LFMDA - IUs reaching required therapeutic coverage' },
            { dn: 'OMDA - IUs reaching required therapeutic coverage Round 1' },
            { dn: 'OMDA - IUs reaching required therapeutic coverage Round 2' },
            null,
            {
                dn:
                    'SCMDA - IUs reaching required therapeutic coverage Round 1',
            },
            {
                dn:
                    'SCMDA - IUs reaching required therapeutic coverage Round 2',
            },
            null,
            {
                dn:
                    'STMDA - IUs reaching required therapeutic coverage Round 1',
            },
            {
                dn:
                    'STMDA - IUs reaching required therapeutic coverage Round 2',
            },
            null,
            null,
        ],
    },
    {
        name:
            'People, in population eligible for treatment, receiving MDA treatment',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            { dn: 'TCMDA - Total Persons Treated' },
            { dn: 'LFMDA - Total Persons Treated' },
            { dn: 'OMDA - Total Persons Treated Round 1' },
            { dn: 'OMDA - Total Persons Treated Round 2' },
            // The following one and the other two named like it are standar Indicators
            {
                dn:
                    'OMDA - Total People, in population eligible for treatment, receiving MDA treatment',
            },
            { dn: 'SCMDA - Total Persons Treated Round 1' },
            { dn: 'SCMDA - Total Persons Treated Round 2' },
            {
                dn:
                    'SCMDA - Total People, in population eligible for treatment, receiving MDA treatment',
            },
            { dn: 'STMDA - Total Persons Treated Round 1' },
            { dn: 'STMDA - Total Persons Treated Round 2' },
            {
                dn:
                    'STMDA - Total People, in population eligible for treatment, receiving MDA treatment',
            },
            null,
        ],
    },
    {
        name:
            'Number of People, in population eligible for treatment, not receiving MDA treatment',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            {
                dn:
                    'TCMDA - People, in population eligible for treatment, not receiving MDA treatment',
            },
            {
                dn:
                    'LFMDA - People, in population eligible for treatment, not receiving MDA treatment',
            },
            {
                dn:
                    'OMDA - People, in population eligible for treatment, not receiving MDA treatment Round 1',
            },
            {
                dn:
                    'OMDA - People, in population eligible for treatment, not receiving MDA treatment Round 2',
            },
            {
                dn:
                    'OMDA - Total People, in population eligible for treatment, not receiving MDA treatment',
                dId: 'aMUoBNLJ21U', // Provided because duplicate name in Ind. and prog.Ind.
            },
            {
                dn:
                    'SCMDA - People, in population eligible for treatment, not receiving MDA treatment Round 1',
            },
            {
                dn:
                    'SCMDA - People, in population eligible for treatment, not receiving MDA treatment Round 2',
            },
            {
                dn:
                    'SCMDA - Total People, in population eligible for treatment, not receiving MDA treatment',
                dId: 'OAwgpaRCOvc',
            },
            {
                dn:
                    'STMDA - People, in population eligible for treatment, not receiving MDA treatment Round 1',
            },
            {
                dn:
                    'STMDA - People, in population eligible for treatment, not receiving MDA treatment Round 2',
            },
            {
                dn:
                    'STMDA - Total People, in population eligible for treatment, not receiving MDA treatment',
                dId: 'c3F2W3YUOgT',
            },
            {
                dn:
                    'MDA - Total People, in population eligible for treatment, not receiving MDA treatment',
                options: { omitIfMultipleYearsSelected: true },
            },
        ],
    },
    {
        name: 'IU supported with NTD MDA treatment planning and coordination',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE,
        cells: [
            {
                dn:
                    'TCMDA - IU supported with NTD MDA treatment planning and coordination',
            },
            {
                dn:
                    'LFMDA - IU supported with NTD MDA treatment planning and coordination',
            },
            {
                dn:
                    'OMDA - IU supported with NTD MDA treatment planning and coordination Round 1',
            },
            {
                dn:
                    'OMDA - IU supported with NTD MDA treatment planning and coordination Round 2',
            },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            {
                dn:
                    'SCMDA - IU supported with NTD MDA treatment planning and coordination Round 1',
            },
            {
                dn:
                    'SCMDA - IU supported with NTD MDA treatment planning and coordination Round 2',
            },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            {
                dn:
                    'STMDA - IU supported with NTD MDA treatment planning and coordination Round 1',
            },
            {
                dn:
                    'STMDA - IU supported with NTD MDA treatment planning and coordination Round 2',
            },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            null,
        ],
    },

    // Coverage evaluation
    { name: 'Coverage Evaluation', type: rowTypes.CATEGORY },
    {
        name:
            'IUs where MDA treatment coverage was verified and addressed using SCT',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE_EVALUATION,
        cells: [
            {
                dn:
                    'TCMDA - IUs where MDA treatment coverage was verified and addressed using SCT',
            },
            {
                dn:
                    'LFMDA - IUs where MDA treatment coverage was verified and addressed using SCT',
            },
            {
                dn:
                    'OMDA - IUs where MDA treatment coverage was verified and addressed using SCT Round 1',
            },
            {
                dn:
                    'OMDA - IUs where MDA treatment coverage was verified and addressed using SCT Round 2',
            },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            {
                dn:
                    'SCMDA - IUs where MDA treatment coverage was verified and addressed using SCT Round 1',
            },
            {
                dn:
                    'SCMDA - IUs where MDA treatment coverage was verified and addressed using SCT Round 2',
            },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            {
                dn:
                    'STMDA - IUs where MDA treatment coverage was verified and addressed using SCT Round 1',
            },
            {
                dn:
                    'STMDA - IUs where MDA treatment coverage was verified and addressed using SCT Round 2',
            },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            {
                customLogic: cells =>
                    uniqueRespondingIUs(cells).then(
                        ({ numUniqueIUs }) => numUniqueIUs
                    ),
                options: { omitIfMultipleYearsSelected: true },
                tooltips: [
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'IUs that participated in multiple MDAs are not double-counted here',
                    },
                ],
            },
        ],
    },
    {
        name: 'IUs not meeting the cut-off value for SCT',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE_EVALUATION,
        cells: [
            { dn: 'TCMDA - IUs not meeting the cut-off value for SCT' },
            { dn: 'LFMDA - IUs not meeting the cut-off value for SCT' },
            { dn: 'OMDA - IUs not meeting the cut-off value for SCT Round 1' },
            { dn: 'OMDA - IUs not meeting the cut-off value for SCT Round 2' },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            { dn: 'SCMDA - IUs not meeting the cut-off value for SCT Round 1' },
            { dn: 'SCMDA - IUs not meeting the cut-off value for SCT Round 2' },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            { dn: 'STMDA - IUs not meeting the cut-off value for SCT Round 1' },
            { dn: 'STMDA - IUs not meeting the cut-off value for SCT Round 2' },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            null,
        ],
    },
    {
        name:
            'Number of evaluation areas where mop-up activites were conducted following a SCT',
        dnBase: '',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE_EVALUATION,
        cells: [
            {
                dn:
                    'TCMDA - IUs where mop-up activities were conducted following a SCT',
            },
            {
                dn:
                    'LFMDA - IUs where mop-up activities were conducted following a SCT',
            },
            {
                dn:
                    'OMDA - IUs where mop-up activities were conducted following a SCT Round 1',
            },
            {
                dn:
                    'OMDA - IUs where mop-up activities were conducted following a SCT Round 2',
            },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            {
                dn:
                    'SCMDA - IUs where mop-up activities were conducted following a SCT Round 1',
            },
            {
                dn:
                    'SCMDA - IUs where mop-up activities were conducted following a SCT Round 2',
            },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            {
                dn:
                    'STMDA - IUs where mop-up activities were conducted following a SCT Round 1',
            },
            {
                dn:
                    'STMDA - IUs where mop-up activities were conducted following a SCT Round 2',
            },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            {
                customLogic: cells =>
                    uniqueRespondingIUs(cells).then(
                        ({ numUniqueIUs }) => numUniqueIUs
                    ),
                options: { omitIfMultipleYearsSelected: true },
                tooltips: [
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'IUs that participated in multiple MDAs are not double-counted here',
                    },
                ],
            },
        ],
    },
    {
        name:
            'Number of IUs for which independent representative coverage surveys according to WHO guidelines were completed',
        dnBase: '',
        type: rowTypes.DATA,
        color: rowColors.COVERAGE_EVALUATION,
        cells: [
            {
                dn:
                    'TCMDA - IUs where independent representative coverage surveys according to WHO guidelines were completed',
            },
            {
                dn:
                    'LFMDA - IUs where independent representative coverage surveys according to WHO guidelines were completed',
            },
            {
                dn:
                    'OMDA - IUs where independent representative coverage surveys according to WHO guidelines were completed Round 1',
            },
            {
                dn:
                    'OMDA - IUs where independent representative coverage surveys according to WHO guidelines were completed Round 2',
            },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            {
                dn:
                    'SCMDA - IUs where independent representative coverage surveys according to WHO guidelines were completed Round 1',
            },
            {
                dn:
                    'SCMDA - IUs where independent representative coverage surveys according to WHO guidelines were completed Round 2',
            },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            {
                dn:
                    'STMDA - IUs where independent representative coverage surveys according to WHO guidelines were completed Round 1',
            },
            {
                dn:
                    'STMDA - IUs where independent representative coverage surveys according to WHO guidelines were completed Round 2',
            },
            {
                customLogic: (cells, idx) =>
                    greatestOf(cells[idx - 1].value, cells[idx - 2].value),
            },
            {
                customLogic: cells =>
                    uniqueRespondingIUs(cells).then(
                        ({ numUniqueIUs }) => numUniqueIUs
                    ),
                options: { omitIfMultipleYearsSelected: true },
                tooltips: [
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'IUs that participated in multiple MDAs are not double-counted here',
                    },
                ],
            },
        ],
    },

    // LNOB
    { name: 'LNOB', type: rowTypes.CATEGORY },
    {
        name:
            'Number of people from marginilized groups (LNOB) who received NTD MDA treatment',
        type: rowTypes.DATA,
        color: rowColors.LNOB,
        cells: [
            {
                dn:
                    'TCMDA - People from marginalized groups (LNOB) receiving NTD MDA treatment',
            },
            {
                dn:
                    'LFMDA - People from marginalized groups (LNOB) receiving NTD MDA treatment',
            },
            {
                dn:
                    'OMDA - People from marginalized groups (LNOB) receiving NTD MDA treatment Round 1',
            },
            {
                dn:
                    'OMDA - People from marginalized groups (LNOB) receiving NTD MDA treatment Round 2',
            },
            {
                dn:
                    'OMDA - Total People from marginalized groups (LNOB) receiving NTD MDA treatment',
            },
            {
                dn:
                    'SCMDA - People from marginalized groups (LNOB) receiving NTD MDA treatment Round 1',
            },
            {
                dn:
                    'SCMDA - People from marginalized groups (LNOB) receiving NTD MDA treatment Round 2',
            },
            {
                dn:
                    'SCMDA - Total People from marginalized groups (LNOB) receiving NTD MDA treatment',
            },
            {
                dn:
                    'STMDA - People from marginalized groups (LNOB) receiving NTD MDA treatment Round 1',
            },
            {
                dn:
                    'STMDA - People from marginalized groups (LNOB) receiving NTD MDA treatment Round 2',
            },
            {
                dn:
                    'STMDA - Total People from marginalized groups (LNOB) receiving NTD MDA treatment',
            },
            {
                customLogic: (cells, idx) =>
                    uniqueRespondingIUs(cells).then(
                        ({ sumOfValues }) => sumOfValues
                    ),
                options: { omitIfMultipleYearsSelected: true },
                tooltips: [
                    {
                        type: tooltipTypes.INFO,
                        message:
                            'IUs that participated in multiple MDAs are not double-counted here',
                    },
                ],
            },
        ],
    },
]
// End row & cell definitions

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
// Cell-width of table
const totalColumns =
    1 +
    columns.reduce(
        (sum, column) => sum + (column.subcategories?.length || 1),
        0
    )

let state = {
    currentYear: currentYear,
    period: initialPeriod,
    orgUnit: initialOrgUnit,
    numberFormat,
    totalColumns,
    // Dim. IDs, found by dimension-name lookup:
    dimensionsToQuery: [],
    // Warnings and errors to be displayed in tooltips:
    alerts: [],
}

/**
 *
 * Custom logic helper functions
 *
 */
function greatestOf(...args) {
    const nums = args.filter(n => !isNaN(n))
    if (!nums.length) return 0
    return Math.max(...nums)
}

function sumOf(...args) {
    const nums = args.filter(n => !isNaN(n))
    if (!nums.length) return 0
    return nums.reduce((sum, n) => sum + Number(n), 0)
}

function multipleYearsSelected() {
    return String(state.period).split(';').length > 1
}

function uniqueRespondingIUs(cells, options = {}) {
    // This function counts all unique IUs with at least one value in this row
    // 1. Build dimensions list for query url
    const dimensions = cells
        .filter(cell => cell && cell.dId)
        .map(cell => cell.dId)
        .join(';')

    // 1.1 Figure out period for query filter
    const filterPeriod =
        multipleYearsSelected() && options.showOnlyCurrentYearIfMultipleSelected
            ? state.currentYear
            : state.period

    // 2. Query analytics:
    return $.get('../api/analytics', {
        // Second orgunit dimension is hardcoded to IU level
        dimension: `dx:${dimensions},ou:${state.orgUnit};LEVEL-iGO9aN3ZSSi`,
        filter: `pe:${filterPeriod}`,
        skipMeta: true,
    })
        .then(json => {
            // 3. Get unique org units (IUs) with response > 0
            const uniqueOrgUnits = new Map()
            json.rows.forEach(([dimensionId, orgUnitId, value]) => {
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
                if (isNaN(value)) return
                sumOfValues += Number(value)
            })
            const numUniqueIUs = uniqueOrgUnits.size

            return { numUniqueIUs, sumOfValues }
        })
        .catch(err => {
            // Format error for later handling
            return Promise.reject({ ...err, message: 'Unique IUs error' })
        })
}

/**
 *
 * Table logic
 *
 */
function getAllDimensions() {
    // Gets a list of all indicators' and program indicators' names and IDs
    return Promise.all([
        $.get(
            '../api/programIndicators.json?filter=displayName:like:MDA&paging=false'
        ),
        $.get(
            '../api/indicators.json?filter=displayName:like:MDA&paging=false'
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
    // Populates dimensionId (`dId`) on cells based on dimensionName
    // Also populates `state.dimensionsToQuery` for analytics query
    const dimensionsToQuery = []

    // Look up dimension ids by name and add ids to cells
    rows.forEach(({ cells }) => {
        if (!cells) return

        cells.forEach(cell => {
            if (!cell) return
            if (cell.dId) {
                // cell already has `dimensionId`; skip ID lookup
                dimensionsToQuery.push(cell.dId)
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
            cell.dId = dimensionId
        })
    })

    state = { ...state, dimensionsToQuery }
    return dimensionsToQuery
}

function getAnalyticsData() {
    // Query analytics API for data (with one monolithic query)
    const { dimensionsToQuery, period, orgUnit } = state

    return $.get('../api/analytics', {
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
            return $.get('../api/analytics', {
                dimension: `dx:${dimensionId},pe:${period}`,
                filter: `ou:${orgUnit}`,
                skipMeta: true,
            }).then(
                // If successful, return key-value pair of data
                json => {
                    if (!json.rows.length) return
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
        rows.map(async ({ cells }, rowIdx) => {
            if (!cells) return // Empty row; return

            // Execute (possibly async) cell logic in _series_
            return cells
                .reduce((prevTask, cell, idx, arr) => {
                    return prevTask.then(async () => {
                        if (!cell) return
                        const {
                            dId: dimensionId,
                            customLogic,
                            options,
                            tooltips,
                        } = cell

                        if (
                            options?.omitIfMultipleYearsSelected &&
                            multipleYearsSelected()
                        ) {
                            cell.value = 'n/a'
                            const newTooltip = {
                                type: tooltipTypes.INFO,
                                message:
                                    'Value is omitted when multiple years are selected',
                            }
                            cell.tooltips = tooltips
                                ? [...tooltips, newTooltip]
                                : [newTooltip]
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
                                cell.value = await customLogic(arr, idx)
                            } catch (err) {
                                // If error in custom logic, create alert
                                const message = `
                      ${err.message || 'Custom logic error'}:
                      ${err.status || ''} ${err.statusText || ''}.
                      See console.
                    `
                                state.alerts.push({
                                    identifier: 'custom-logic',
                                    identifierValue: `row-${rowIdx}-idx-${idx}`,
                                    tooltipType: tooltipTypes.ERROR,
                                    message,
                                })
                                console.error(message, err)
                            }
                            return
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
function populateHtmlTableHeader() {
    // Empty cell over row names (Maybe "indicator?")
    $('#header-row').append(`<th scope="col"></th>`)
    columns.forEach(col => {
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
            return
        }
    })
}

function populateHtmlTableBodyWithValues() {
    // Clear tbody for fresh rows & remove "loading"
    const tbody = $('#tbody').empty()
    $('#loading').hide()

    // Set up table body
    rows.forEach((row, rowIdx) => {
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

        const { dn, dId, customLogic, value } = cell
        const newCell = $(`
        <td
          ${dn ? `data-dimension-name="${dn}"` : ''}
          ${dId ? `data-dimension-id="${dId}"` : ''}
          ${customLogic ? `data-custom-logic="row-${rowIdx}-idx-${idx}"` : ''}
        ></td>
      `)

        // Add value and format number
        if (typeof value !== 'undefined') {
            const formattedValue = isNaN(value)
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
        periodPrettyString,
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
    const columnHeaders = columns.forEach(column => {
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
    const csvHeaders =
        colHeadersTop.join(',') + '\n' + colHeadersBot.join(',') + '\n'

    // 2. Map each row; join with newlines
    // 3. Map each cell; join with columns
    const csvRows = rows
        .map(row => {
            const formattedName = row.name.replace(/,/g, '')
            if (!row.cells) return formattedName

            const csvCells = row.cells
                .map(cell => {
                    // If cell is empty or has no value, make empty cell element
                    if (!cell || typeof cell.value === 'undefined') return null
                    const { value } = cell
                    const formattedValue = isNaN(value)
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
    link.setAttribute('download', 'mda_report.csv')
    window.frameElement.parentNode.appendChild(link) // Bypasses chrome sandboxed iframe restrictions

    link.click() // This will download the data file named "mda_report.csv".
}

/**
 *
 * Period & Org Unit selection
 *
 */
function setUpPeriodCheckboxes(startingYear) {
    // Populate period checkboxes, including "all years"
    const currentYear = state.currentYear

    const allYears = []
    for (let year = currentYear; year >= startingYear; year--) {
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
            ${year == currentYear ? 'checked' : ''}
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

function setUpOrgUnitCheckboxes(maxLevel) {
    $.get('../api/organisationUnits.json', { maxLevel, paging: false })
        .then(({ organisationUnits: orgUnits }) => {
            if (!orgUnits) return

            const orgUnitCheckboxes = $('#orgUnitCheckboxes')

            const allOrgUnits = new Map()
            orgUnits.forEach(({ id, displayName }, idx) => {
                // Set first orgUnit to state (should be global org unit)
                if (idx === 0) state = { ...state, orgUnit: id }

                allOrgUnits.set(id, displayName)
                orgUnitCheckboxes.append(`
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="${id}"
                name="orgUnit"
                id="${id}"
                ${idx === 0 ? 'checked' : ''}
              />
              <label class="form-check-label" for="${id}">
                ${displayName}
              </label>
            </div>
          `)
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
jQuery(document).ready(function () {
    // Javascript to be executed after page is loaded here

    setUpCheckboxForm({ startingYear: 2010, maxOrgUnitLevel: 2 })
    populateHtmlTableHeader()
    getAllDimensions()
        .then(populateCellDimensionIds)
        .then(loadTableData)
        .catch(console.error)
})
