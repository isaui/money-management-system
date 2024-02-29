import { ITransaction } from "./ITransaction"

export interface ITransactionTile {
    transaction: ITransaction
    initialShowLess: boolean
    onFetchBack:()=> void
}