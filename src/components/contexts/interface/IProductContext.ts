import { ITransaction } from "@/components/modules/DashboardModule/interface/ITransaction";

export interface IProductContext{
    incomeTransactions: ITransaction[]
    outcomeTransactions: ITransaction[]
    balanceTransactions: ITransaction[]
    clearAll: () => void
    fetchDatabase: () => void
}