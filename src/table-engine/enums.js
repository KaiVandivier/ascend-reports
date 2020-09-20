// Enums for table
export const colSubcats = Object.freeze({
    ROUND_1: { name: 'Round 1', shortName: 'R1' },
    ROUND_2: { name: 'Round 2', shortName: 'R2' },
    TOTAL: { name: 'Total', shortName: 'Tot.' },
})
export const rowTypes = Object.freeze({
    CATEGORY: 'category',
    DATA: 'data',
})
export const rowColors = Object.freeze({
    ENDEMICITY: 'yellow',
    TARGETS: 'blue',
    COVERAGE: 'pink',
    COVERAGE_EVALUATION: 'green',
    LNOB: 'lilac',
})
export const tooltipTypes = Object.freeze({
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
