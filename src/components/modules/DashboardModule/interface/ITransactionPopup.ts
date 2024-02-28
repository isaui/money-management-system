import { ITransaction } from "./ITransaction"

export interface ITransactionPopup {
    onCancel: () => void
    onSuccess: () => void
    title: string
    transaction?: ITransaction
}