import { ITransaction } from "../../../contexts/interface/ITransaction"

export interface ITransactionTile {
    transaction: ITransaction
    initialShowLess: boolean
    onFetchBack:()=> void
}