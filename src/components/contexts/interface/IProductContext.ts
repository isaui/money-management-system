import { ITransaction } from "@/components/contexts/interface/ITransaction";

export interface IProductContext{
    incomeTransactions: ITransaction[]
    outcomeTransactions: ITransaction[]
    balanceTransactions: ITransaction[]
    clearAll: () => void
    fetchDatabase: () => void
}