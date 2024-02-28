'use client'
import Header from "@/components/elements/Header"
import SidebarLayout from "@/components/layouts/SidebarLayout"
import FinancialTiles from "./sections/FinancialTiles"
import FinancialOverview from "./sections/FinancialOverview"
import TransactionSection from "./sections/TransactionSection"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "@/components/contexts/AuthContext"
import { IBalance } from "./interface/IBalance"

const DashboardModule = () =>{
    const {user} = useAuth();
    const [currentBalance, setCurrentBalance] = useState<IBalance | null>(null)
    const [balanceHistory, setBalanceHistory] = useState<IBalance[]>([])
    useEffect(()=>{
        if(user){
            fetchBalance()
        }
    },[user])

    const fetchBalance = async () => {
        const res = await axios.post('/api/query',{
            queryString:`SELECT * FROM BALANCE WHERE user_id ='${user?.userId}' ORDER BY transaction_time DESC;`
        })
        console.log(res)
        const data = res.data.result.rows[0]
        const nwBalance : IBalance = {
            amount: data.amount,
            balanceId: data.balance_id,
            transactionTime: new Date(data.transaction_time),
            relatedUpdate: data.related_update,
            userId:data.user_id
        }
        setCurrentBalance(nwBalance)
        setBalanceHistory(res.data.result.rows)
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
                <FinancialTiles currentBalance={currentBalance}/>
                <FinancialOverview/>
                <TransactionSection/>
            </div>
            <div className="hidden xxlg:flex flex-col w-[20rem] rounded-xl p-4 bg-slate-950 bg-opacity-40 h-full">
            <h1 className="text-2xl md:text-3xl xlg:text-4xl text-white font-bold">Category</h1>
            </div>
            </div>
        </div>
    </div>
    </div>
</SidebarLayout>
}
export default DashboardModule