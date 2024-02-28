export interface ILineGraph<T> {
    dropdownValues: Array<string>
    onClickDropdownValue: (value: string) => void
    yAxisLabel: string
    lineValues: Array<T>
    lineLabels: Array<string>
    xAxisLabel: string
    lineColors: Array<string>
}

