import { createTable } from '../../table-engine/table-engine'
import { rowTypes } from '../../table-engine/enums'

/**
 * Row and column definitions: Edit these to define the table.
 * See the documentation at https://github.com/KaiVandivier/ascend-mda-report
 * for a guide.
 */
const columns = [
    {
        name: 'Lymphatic Filariasis',
        shortName: 'LF',
        subcategories: null,
    },
    {
        name: 'Trachoma',
        shortName: 'Trachoma',
        subcategories: null,
    },
]

const rows = [
    {
        name:
            'Number of health care providers providing morbidity management who received training on morbidity management (LF: Lymphoedema, Hydrocele. Trachoma: Trichiasis)',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFMMDP - Health care providers providing morbidity management who received training on morbidity management_LF: Lymphoedema, Hydrocele; Trachoma: Trichiasis',
            },
            {
                dn:
                    'TCMMDP - Health care providers providing morbidity management who received training on morbidity management_LF: Lymphoedema, Hydrocele; Trachoma: Trichiasis',
            },
        ],
    },
    {
        name: 'Reduction in backlog of MMDP care required per IU',
        type: rowTypes.DATA,
        cells: [
            {
                dn: 'LFMMDP - Reduction in backlog of MMDP care required',
            },
            null,
        ],
    },
    {
        name: 'Reduction in backlog of Trachoma cases requiring surgery per IU',
        type: rowTypes.DATA,
        cells: [
            null,
            {
                dn:
                    'TCMMDP - Reduction in backlog of Trachoma cases requiring surgery per IU',
            },
        ],
    },
    {
        name: 'Reduction in Trachoma burden below 1/1000',
        type: rowTypes.DATA,
        cells: [
            null,
            { dn: 'TCMMDP - Reduction in Trachoma burden below 1/1000' },
        ],
    },
    {
        name:
            'Number of people in need of morbidity management and disability prevention activities who have received the required intervention for NTD',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFMMDP - People in need of morbidity management and disability prevention activities who have received the required intervention for NTD',
            },
            {
                dn:
                    'TCMMDP - People in need of morbidity management and disability prevention activities who have received the required intervention for NTD',
            },
        ],
    },
    {
        name:
            'Number of facilities in endemic IUs  with > 3 month stock of surgical supplies ',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFMMDP - Facilities in endemic IUs  with > 3 month stock of surgical supplies',
            },
            {
                dn:
                    'TCMMDP - Facilities in endemic IUs  with > 3 month stock of surgical supplies',
            },
        ],
    },
    {
        name:
            'Number of facilities in NTD morbidity endemic areas, providing surgeries (including camps).',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFMMDP - Facilities in NTD morbidity endemic areas, providing surgeries_including camps',
            },
            {
                dn:
                    'TCMMDP - Facilities in NTD morbidity endemic areas, providing surgeries_including camps',
            },
        ],
    },
    {
        name: 'Number of cases receiving MMDP care per IU',
        type: rowTypes.DATA,
        cells: [
            { dn: 'LFMMDP - Cases receiving MMDP care per IU' },
            { dn: 'TCMMDP - Cases receiving MMDP care per IU' },
        ],
    },
    {
        name: 'Number of facilities per IU which provide MMDP services',
        type: rowTypes.DATA,
        cells: [
            {
                dn: 'LFMMDP - Facilities per IU which provide MMDP services',
            },
            null,
        ],
    },
    {
        name:
            'Number of IUs which receive funding/supply for mmdp (LF, VL, trachoma)',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFMMDP - IUs which receive funding/supply for MMDP_LF, VL, trachoma',
            },
            {
                dn:
                    'TCMMDP - IUs which receive funding/supply for MMDP_LF, VL, trachoma',
            },
        ],
    },
    {
        name:
            'Number of people trained in mmdp care (for lymphoedema management, hydrocelectomy, TT surgery, VL treatment).',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFMMDP - People trained in MMDP care_for lymphoedema management, hydrocelectomy, TT surgery, VL treatment',
            },
            {
                dn:
                    'TCMMDP - People trained in MMDP care_for lymphoedema management, hydrocelectomy, TT surgery, VL treatment',
            },
        ],
    },
]
// End row & cell definitions

window.jQuery(document).ready(() =>
    createTable({
        rows,
        columns,
        dimensionFilterText: 'MMDP',
        reportTitle: 'LF & Trachoma MMDP Summary',
    })
)
