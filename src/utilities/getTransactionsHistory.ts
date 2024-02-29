import { ITransaction } from "@/components/contexts/interface/ITransaction";

export const getTransactionsHistory = (transactions: ITransaction[]) : ITransaction[]=> {
    const nwTransactions = transactions.filter((transaction)=> 
                        !(transaction.label == 'Balance' && transaction.isRelatedToTransaction))
    nwTransactions.sort((a,b)=> b.time.getTime() - a.time.getTime())
    return nwTransactions
}

export const getAllTransactionsHistory = (transactions: ITransaction[]) : ITransaction[]=> {
    transactions.sort((a,b)=> a.time.getTime() - b.time.getTime())
    return transactions
}