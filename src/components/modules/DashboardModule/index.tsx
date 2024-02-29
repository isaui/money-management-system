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
                <FinancialTiles/>
                <FinancialOverview/>
                <TransactionSection/>
            </div>
            </div>
        </div>
    </div>
    </div>
</SidebarLayout>
}
export default DashboardModule