export interface ITextField{
    textfieldKey: string
    icon: React.ReactNode
    placeholder?: string
    onChangeValue: (text:string) => void
    isPassword: boolean,
    value: string,
    readonly: boolean,
    isNumber?: boolean
}