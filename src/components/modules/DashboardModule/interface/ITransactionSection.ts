import { ITransaction } from "./ITransaction";

export interface ITransactionSection{
    transactions: ITransaction[]
    onFetchBack: ()=>void
}