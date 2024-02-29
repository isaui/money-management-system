import { ITransaction } from "@/components/contexts/interface/ITransaction";

export const calculateTransaction = (transactions: ITransaction[]) => {
    let val = 0
    transactions.forEach((transaction)=>{
        val +=  parseFloat(transaction.price)
    })
    return val

}