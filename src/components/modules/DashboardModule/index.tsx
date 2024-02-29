'use client'
import Header from "@/components/elements/Header"
import SidebarLayout from "@/components/layouts/SidebarLayout"
import FinancialTiles from "./sections/FinancialTiles"
import FinancialOverview from "./sections/FinancialOverview"
import TransactionSection from "./sections/TransactionSection"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "@/components/contexts/AuthContext"
import { ITransaction } from "./interface/ITransaction"
import { calculateTransaction } from "@/utilities/calculateTransaction"
import { getAllTransactionsHistory, getTransactionsHistory } from "@/utilities/getTransactionsHistory"

const DashboardModule = () =>{
    const {user} = useAuth();
    const [currentBalance, setCurrentBalance] = useState<ITransaction | null>(null)
    const [balanceHistory, setBalanceHistory] = useState<ITransaction[]>([])
    const [incomeTransactions, setIncomeTransactions] = useState<ITransaction[]>([])
    const [outComeTransactions, setOutcomeTransactions] = useState<ITransaction[]>([])
    const [needfetch, setNeedFetch] = useState<boolean>(false)
    useEffect(()=>{
        if(user){
           fetchAll()
        }
    },[user, needfetch])


    const refreshBackend = () => {
        setNeedFetch(prev=> !prev)
    }

    const fetchAll = async () => {
      Promise.all([fetchBalance(),
        fetchIncome(),
        fetchOutcome()])
    }

    const fetchIncome = async () => {
        const transactions: ITransaction[] = []
        const res = await axios.post('/api/query',{
            queryString:`SELECT i.income_id, i.income_name, i.income_thumbnail, i.income_information, i.income_amount, 
             i.transaction_time, i.is_affecting, b.amount
             FROM INCOME i 
             INNER JOIN BALANCE b
            ON i.prev_balance_id = b.balance_id 
            WHERE i.user_id ='${user?.userId}' ORDER BY i.transaction_time DESC;`
        })
        console.log(res)
        const rows = res.data.result.rows
        rows.forEach((entry:any) => {
            const transaction: ITransaction = {
                id: entry.income_id,
                label: "Income",
                title: entry.income_name,
                imageUrl: entry.income_thumbnail,
                note: entry.income_information,
                price: entry.income_amount,
                time: new Date(entry.transaction_time),
                isAffectingBalance: entry.is_affecting,
                prevTransactionAmount: entry.amount
            }
            transactions.push(transaction)
        });
      setIncomeTransactions(transactions)

    }

    const fetchOutcome = async  () => {
        const transactions: ITransaction[] = []
        const res = await axios.post('/api/query',{
            queryString:`SELECT e.expense_id, e.expense_name, e.expense_thumbnail, 
            e.expense_information, e.expense_amount, e.transaction_time, e.is_affecting, b.amount FROM EXPENSE e 
            INNER JOIN BALANCE b on e.prev_balance_id
             = b.balance_id WHERE e.user_id ='${user?.userId}' ORDER BY transaction_time DESC;`
        })
      //  console.log(res)
        const rows = res.data.result.rows
        rows.forEach((entry:any) => {
            const transaction: ITransaction = {
                id: entry.expense_id,
                label: "Outcome",
                title: entry.expense_name,
                imageUrl: entry.expense_thumbnail,
                note: entry.expense_information,
                price: entry.expense_amount,
                time: new Date(entry.transaction_time),
                isAffectingBalance: entry.is_affecting,
                prevTransactionAmount: entry.amount
            }
            transactions.push(transaction)
        });
      setOutcomeTransactions(transactions)
    }

    const fetchBalance = async () => {
        const res = await axios.post('/api/query',{
            queryString:`SELECT * FROM BALANCE WHERE user_id ='${user?.userId}' ORDER BY balance_id DESC;`
        })
       // console.log(res)
        const updatedBalanceHistory : ITransaction[] = [] 
        const rows = res.data.result.rows
        rows.forEach((data:any, index:number)=>{
            const newBalance : ITransaction =
                {
                    id: data.balance_id,
                    label: "Balance",
                    prevTransactionAmount: index == rows.length - 1? "0": rows[index+1].amount,
                    title: "Update Saldo Manual" ,
                    imageUrl: "",
                    note: "Pengguna melakukan update saldo secara manual tanpa mempertimbangkan transaksi yang sudah ada sebelumnya",
                    price: data.amount,
                    time: new Date(data.transaction_time),
                    isRelatedToTransaction: data.related_update
                }
            updatedBalanceHistory.push(newBalance)
        })
        setCurrentBalance(updatedBalanceHistory.length == 0? null : updatedBalanceHistory[0])
        setBalanceHistory(updatedBalanceHistory)
        console.log(updatedBalanceHistory)
    }
    
    return <SidebarLayout>
    <div className="flex flex-col  w-full h-full">
    <div className="p-4 w-full flex flex-col h-full mx-auto">
       <div className="flex max-w-7xl  justify-center  mx-auto w-full">
        <Header includeSearchBar={true} includeSidebarMenu={true} />
        </div>
        <div className="flex flex-col  w-full mx-auto overflow-y-auto pt-4">
            <div className="flex w-full mx-auto max-w-7xl space-x-4 px-4">
            <div className="flex flex-col grow ">
                <h1 className="text-2xl md:text-3xl xlg:text-4xl text-white font-bold mb-8">Dashboard</h1>
                <FinancialTiles 
                    incomeTotal={calculateTransaction(incomeTransactions).toString()} 
                    outcomeTotal={calculateTransaction(outComeTransactions).toString()} 
                    onFetchCallBack={refreshBackend} 
                    currentBalance={currentBalance? currentBalance?.price : '0'}
                />
                <FinancialOverview transactions={getAllTransactionsHistory(
                        [...balanceHistory, ...incomeTransactions,...outComeTransactions])}/>
                <TransactionSection
                    onFetchBack={refreshBackend}
                    transactions={getTransactionsHistory(
                        [...balanceHistory, ...incomeTransactions,...outComeTransactions])}
                />
            </div>
            </div>
        </div>
    </div>
    </div>
</SidebarLayout>
}
export default DashboardModule