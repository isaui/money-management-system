export interface ITextArea{
    textfieldKey: string
    placeholder?: string
    onChangeValue: (text:string) => void
    value: string,
    readonly: boolean
}