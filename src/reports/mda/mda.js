import {
    createTable,
    greatestOf,
    uniqueRespondingIUs,
} from '../../table-engine/table-engine'
import {
    colSubcats,
    rowTypes,
    rowColors,
    tooltipTypes,
} from '../../table-engine/enums'

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

// Load the table based on rows and columns
window.jQuery(document).ready(createTable(rows, columns))
