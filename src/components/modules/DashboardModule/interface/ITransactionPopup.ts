import { ITransaction } from "../../../contexts/interface/ITransaction"

export interface ITransactionPopup {
    onCancel: () => void
    onSuccess: () => void
    title: string
    transaction?: ITransaction
}