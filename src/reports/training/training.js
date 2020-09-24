import { createTable } from '../../table-engine/table-engine'
import { rowTypes } from '../../table-engine/enums'

/**
 * Row and column definitions: Edit these to define the table.
 * See the documentation at https://github.com/KaiVandivier/ascend-mda-report
 * for a guide.
 */
const columns = [
    {
        name: 'Female',
        shortName: 'Female',
        subcategories: null,
    },
    {
        name: 'Male',
        shortName: 'Male',
        subcategories: null,
    },
    {
        name: 'Total',
        shortName: 'Total',
        subcategories: null,
    },
]

const rows = [
    {
        name: 'People trained to support morbidity mapping for LF',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - People trained to support morbidity mapping for LF_Female',
            },
            {
                dn:
                    'Training - People trained to support morbidity mapping for LF_Male',
            },
            {
                dn:
                    'Training - People trained to support morbidity mapping for LF_Total',
            },
        ],
    },
    {
        name: 'People trained to support morbidity mapping for Trachoma',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - People trained to support morbidity mapping for Trachoma_Female',
            },
            {
                dn:
                    'Training - People trained to support morbidity mapping for Trachoma_Male',
            },
            {
                dn:
                    'Training - People trained to support morbidity mapping for Trachoma_Total',
            },
        ],
    },
    {
        name: 'Staff trained on transmission assessment and data collection',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - Staff trained on transmission assessment and data collection_Female',
            },
            {
                dn:
                    'Training - Staff trained on transmission assessment and data collection_Male',
            },
            {
                dn:
                    'Training - Staff trained on transmission assessment and data collection_Total',
            },
        ],
    },
    {
        name: 'People trained in budgeting',
        type: rowTypes.DATA,
        cells: [
            { dn: 'Training - People trained in budgeting_Female' },
            { dn: 'Training - People trained in budgeting_Male' },
            { dn: 'Training - People trained in budgeting_Total' },
        ],
    },
    {
        name:
            'Total people trained (disaggregated to roles and geographic area)',
        type: rowTypes.DATA,
        cells: [null, null, null],
    },
    {
        name:
            'Health care providers providing morbidity management who received raining on morbidity management (LF: Lymphoedema, Hydrocele; Trachoma: Trichiasis)',
        type: rowTypes.DATA,
        cells: [null, null, null],
    },
    {
        name: 'People trained on data management systems',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - People trained on data management systems_Female',
            },
            { dn: 'Training - People trained on data management systems_Male' },
            {
                dn:
                    'Training - People trained on data management systems_Total',
            },
        ],
    },
    {
        name: 'Surveillance trainings conducted',
        type: rowTypes.DATA,
        cells: [
            null,
            null,
            { dn: 'Training - Surveillance trainings conducted' },
        ],
    },
    {
        name: 'People trained on supply chain management systems',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - People trained on supply chain management systems_Female',
            },
            {
                dn:
                    'Training - People trained on supply chain management systems_Male',
            },
            {
                dn:
                    'Training - People trained on supply chain management systems_Total',
            },
        ],
    },
    {
        name: 'NTD trainings including IEC/BCC components',
        type: rowTypes.DATA,
        cells: [
            null,
            null,
            {
                dn:
                    'Training - NTD trainings including IEC/BCC components_Total',
            },
        ],
    },
    {
        name:
            'Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: CDDs',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: CDDs_Female',
            },
            {
                dn:
                    'Training - Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: CDDs_Male',
            },
            {
                dn:
                    'Training - Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: CDDs_Total',
            },
        ],
    },
    {
        name:
            'Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: FLHW',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: FLHW_Female',
            },
            {
                dn:
                    'Training - Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: FLHW_Male',
            },
            {
                dn:
                    'Training - Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: FLHW_Total',
            },
        ],
    },
    {
        name:
            'Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: Supervisor/Trainers',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: Supervisor/Trainers_Female',
            },
            {
                dn:
                    'Training - Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: Supervisor/Trainers_Male',
            },
            {
                dn:
                    'Training - Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: Supervisor/Trainers_Total',
            },
        ],
    },
    {
        name:
            'Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: Teachers',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: Teachers_Female',
            },
            {
                dn:
                    'Training - Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: Teachers_Male',
            },
            {
                dn:
                    'Training - Health care providers and community drug distributors trained and working on MDA planning, social mobilization, implementation and monitoring: Teachers_Total',
            },
        ],
    },
    {
        name:
            'VL treatment facilities which are functional with adequate trained human resources, diagnostic equipment and supplies and medicines',
        type: rowTypes.DATA,
        cells: [null, null, null],
    },
    {
        name: 'VL treatment facilities receiving training',
        type: rowTypes.DATA,
        cells: [
            null,
            null,
            { dn: 'Training - VL treatment facilities receiving training' },
        ],
    },
    {
        name: 'People trained in mmdp care: Lymphoedema management',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - People trained in mmdp care: Lymphoedema management_Female',
            },
            {
                dn:
                    'Training - People trained in mmdp care: Lymphoedema management_Male',
            },
            {
                dn:
                    'Training - People trained in mmdp care: Lymphoedema management_Total',
            },
        ],
    },
    {
        name: 'People trained in mmdp care: Hydrocelectomy',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - People trained in mmdp care: Hydrocelectomy_Female',
            },
            {
                dn:
                    'Training - People trained in mmdp care: Hydrocelectomy_Male',
            },
            {
                dn:
                    'Training - People trained in mmdp care: Hydrocelectomy_Total',
            },
        ],
    },
    {
        name: 'People trained in mmdp care: TT surgery',
        type: rowTypes.DATA,
        cells: [
            { dn: 'Training - People trained in mmdp care: TT surgery_Female' },
            { dn: 'Training - People trained in mmdp care: TT surgery_Male' },
            { dn: 'Training - People trained in mmdp care: TT surgery_Total' },
        ],
    },
    {
        name: 'People trained in mmdp care: VL treatment',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - People trained in mmdp care: VL treatment_Female',
            },
            { dn: 'Training - People trained in mmdp care: VL treatment_Male' },
            {
                dn:
                    'Training - People trained in mmdp care: VL treatment_Total',
            },
        ],
    },
    {
        name: 'People trained in active case finding for VL',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - People trained in active case finding for VL_Female',
            },
            {
                dn:
                    'Training - People trained in active case finding for VL_Male',
            },
            {
                dn:
                    'Training - People trained in active case finding for VL_Total',
            },
        ],
    },
    {
        name: 'People trained in active case finding for trachoma',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - People trained in active case finding for trachoma_Female',
            },
            {
                dn:
                    'Training - People trained in active case finding for trachoma_Male',
            },
            {
                dn:
                    'Training - People trained in active case finding for trachoma_Total',
            },
        ],
    },
    {
        name: 'People trained in active case finding for LF',
        type: rowTypes.DATA,
        cells: [
            {
                dn:
                    'Training - People trained in active case finding for LF_Female',
            },
            {
                dn:
                    'Training - People trained in active case finding for LF_Male',
            },
            {
                dn:
                    'Training - People trained in active case finding for LF_Total',
            },
        ],
    },
    {
        name: 'Total people trained: all training types',
        type: rowTypes.DATA,
        cells: [
            { dn: 'Training - People trained: all training types_Female' },
            { dn: 'Training - People trained: all training types_Male' },
            { dn: 'Training - People trained: all training types_Total' },
        ],
    },
    {
        name: 'Total people trained: by training type',
        type: rowTypes.DATA,
        cells: [null, { value: 'todo' }, null],
    },
]
// End row & cell definitions

window.jQuery(document).ready(() =>
    createTable({
        rows,
        columns,
        dimensionFilterText: 'Training',
        reportTitle: 'Training Summary',
    })
)
