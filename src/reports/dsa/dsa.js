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
        shortName: 'L.F.',
        subcategories: null,
    },
    {
        name: 'Trachoma',
        shortName: 'Trach.',
        subcategories: null,
    },
    {
        name: 'Onchocerciasis',
        shortName: 'Oncho.',
        subcategories: null,
    },
    {
        name: 'Schistosomiasis',
        shortName: 'Schisto.',
        subcategories: null,
    },
    {
        name: 'S.T. Helminthiasis',
        shortName: 'STH',
        subcategories: null,
    },
    {
        name: 'VL',
        shortName: 'VL',
        subcategories: null,
    },
]

const rows = [
    {
        name:
            'IUs where NTD endemicity / morbidity mapping survey was conducted',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFDSA - IUs where NTD endemicity / morbidity mapping survey was conducted',
            },
            {
                dn:
                    'TCDSA - IUs where NTD endemicity / morbidity mapping survey was conducted',
            },
            {
                dn:
                    'ODSA - IUs where NTD endemicity / morbidity mapping survey was conducted',
            },
            {
                dn:
                    'SCDSA - IUs where NTD endemicity / morbidity mapping survey was conducted',
            },
            {
                dn:
                    'STDSA - IUs where NTD endemicity / morbidity mapping survey was conducted',
            },
            null,
        ],
    },
    {
        name: 'People screened in endemicity / morbidity mapping surveys',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFDSA - People screened in endemicity / morbidity mapping surveys',
            },
            {
                dn:
                    'TCDSA - People screened in endemicity / morbidity mapping surveys',
            },
            {
                dn:
                    'ODSA - People screened in endemicity / morbidity mapping surveys',
            },
            {
                dn:
                    'SCDSA - People screened in endemicity / morbidity mapping surveys',
            },
            {
                dn:
                    'STDSA - People screened in endemicity / morbidity mapping surveys',
            },
            null,
        ],
    },
    {
        // TODO: Check me out - are cell definitions correct?
        name:
            'People which were found to be positive with NTDs during endemicity / morbidity mapping surveys (clinical, RDT)',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFDSA - People positive with NTDs during endemicity / morbidity mapping surveys (clinical, RDT)',
            },
            {
                dn:
                    'TCDSA - People positive with NTDs during endemicity / morbidity mapping surveys (clinical, RDT)',
            },
            {
                dn:
                    'ODSA - People positive with NTDs during endemicity / morbidity mapping surveys (clinical, RDT)',
            },
            {
                dn:
                    'SCDSA - People positive with NTDs during endemicity / morbidity mapping surveys (clinical, RDT)',
            },
            {
                dn:
                    'STDSA - People positive with NTDs during endemicity / morbidity mapping surveys (clinical, RDT)',
            },
            null,
        ],
    },
    {
        name:
            'IUs in the evaluation area where Pre-TAS surveys were completed (or routine monitoring/SSA)',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFDSA - IUs in the evaluation area where Pre-TAS surveys were completed (or routine monitoring/SSA)',
            },
            null,
            {
                dn:
                    'ODSA - IUs in the evaluation area where Pre-TAS surveys were completed (or routine monitoring/SSA)',
            },
            {
                dn:
                    'SCDSA - IUs in the evaluation area where Pre-TAS surveys were completed (or routine monitoring/SSA)',
            },
            {
                dn:
                    'STDSA - IUs in the evaluation area where Pre-TAS surveys were completed (or routine monitoring/SSA)',
            },
            null,
        ],
    },
    {
        name:
            'Communities included in Pre-TAS surveys (or routine monitoring/SSA)',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFDSA - Communities in the evaluation area where Pre-TAS surveys were completed (or routine monitoring/SSA)',
            },
            null,
            {
                dn:
                    'ODSA - Communities in the evaluation area where Pre-TAS surveys were completed (or routine monitoring/SSA)',
            },
            {
                dn:
                    'SCDSA - Communities in the evaluation area where Pre-TAS surveys were completed (or routine monitoring/SSA)',
            },
            {
                dn:
                    'STDSA - Communities in the evaluation area where Pre-TAS surveys were completed (or routine monitoring/SSA)',
            },
            null,
        ],
    },
    {
        name:
            'People participating in pre-TAS surveys (or routine monitoring/SSA)',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFDSA - People participating in pre-TAS surveys (or routine monitoring/SSA)',
            },
            null,
            {
                dn:
                    'ODSA - People participating in pre-TAS surveys (or routine monitoring/SSA)',
            },
            {
                dn:
                    'SCDSA - People participating in pre-TAS surveys (or routine monitoring/SSA)',
            },
            {
                dn:
                    'STDSA - People participating in pre-TAS surveys (or routine monitoring/SSA)',
            },
            null,
        ],
    },
    {
        name: 'People positive in pre-TAS surveys (or routine monitoring/SSA)',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'LFDSA - People positive in pre-TAS surveys (or routine monitoring/SSA)',
            },
            null,
            {
                dn:
                    'ODSA - People positive in pre-TAS surveys (or routine monitoring/SSA)',
            },
            {
                dn:
                    'SCDSA - People positive in pre-TAS surveys (or routine monitoring/SSA)',
            },
            {
                dn:
                    'STDSA - People positive in pre-TAS surveys (or routine monitoring/SSA)',
            },
            null,
        ],
    },
    {
        name: 'IUs where TAS/IA surveys were completed',
        type: rowTypes.DATA,
        cells: [
            { dn: 'LFDSA - IUs where TAS/IA surveys were completed' },
            { dn: 'TCDSA - IUs where TAS/IA surveys were completed' },
            { dn: 'ODSA - IUs where TAS/IA surveys were completed' },
            { dn: 'SCDSA - IUs where TAS/IA surveys were completed' },
            { dn: 'STDSA - IUs where TAS/IA surveys were completed' },
            null,
        ],
    },
    {
        name: 'People participating in IA/TAS surveys',
        type: rowTypes.DATA,
        cells: [
            { dn: 'LFDSA - People participating in IA/TAS surveys' },
            { dn: 'TCDSA - People participating in IA/TAS surveys' },
            { dn: 'ODSA - People participating in IA/TAS surveys' },
            { dn: 'SCDSA - People participating in IA/TAS surveys' },
            { dn: 'STDSA - People participating in IA/TAS surveys' },
            null,
        ],
    },
    {
        name: 'People tested positive during IA/TAS surveys',
        type: rowTypes.DATA,
        cells: [
            { dn: 'LFDSA - People tested positive during IA/TAS surveys' },
            { dn: 'TCDSA - People tested positive during IA/TAS surveys' },
            { dn: 'ODSA - People tested positive during IA/TAS surveys' },
            { dn: 'SCDSA - People tested positive during IA/TAS surveys' },
            { dn: 'STDSA - People tested positive during IA/TAS surveys' },
            null,
        ],
    },
]
// End row & cell definitions

window.jQuery(document).ready(() =>
    createTable({
        rows,
        columns,
        dimensionFilterText: 'DSA',
        reportTitle: 'DSA Summary',
    })
)
