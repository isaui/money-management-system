import Dropdown from "@/components/elements/Dropdown"
import { ITransaction } from "../../../contexts/interface/ITransaction"
import TransactionTile from "../../../modules/DashboardModule/module-elements/TransactionTile"
import { IDropdownOption } from "@/components/elements/interface/IDropdownOption"
import MultiSwitch from "@/components/elements/MultiSwitch"
import React, { useState } from "react"
import { useProductContext } from "@/components/contexts/ProductContext"
import { getTransactionsHistory } from "@/utilities/getTransactionsHistory"
import { ITransactionSection } from "../interface/ITransactionSection"



const sortOption: IDropdownOption[] = [
    {label: "Terbaru", value: "terbaru"},
    {label:"Terlama", value: "terlama"}
]
const transactionType: string[] = ["Semua","Income","Outcome", "Self Changed Balance"]


const TransactionSection: React.FC<ITransactionSection> = ({desiredOutputMatching, desiredTitle}) => {

    const {incomeTransactions, outcomeTransactions, balanceTransactions, fetchDatabase} = useProductContext()
    let transactions = getTransactionsHistory([...balanceTransactions, ...incomeTransactions,...outcomeTransactions])
    if(desiredOutputMatching){
        transactions = transactions.filter(transaction => transaction.title.trim().toLowerCase().includes(desiredOutputMatching.toLowerCase().trim()))
    }
    const [selectedTransactionType, setSelectedTransactionType] = useState<string>(transactionType[0])
    const [selectedSortOption, setSelectedSortOption] = useState<IDropdownOption>(sortOption[0])

    const filterTransactionsBasedType = () => {
        if(selectedTransactionType == "Semua"){
            return transactions
        }
        if(selectedTransactionType == "Self Changed Balance"){
            return transactions.filter((transaction)=> transaction.label == 'Balance' )
        }
        return transactions.filter((transaction)=> transaction.label == selectedTransactionType )
    }
    const sortTransactions = (transactions : ITransaction[]) => {
        const sortedTransactions = [...transactions]
        if(selectedSortOption.value == "terbaru"){
            return sortedTransactions
        }
        return sortedTransactions.reverse()
    }

    const filteredTransactions = sortTransactions(filterTransactionsBasedType())

    const updateSelectedTransactionType = (value:string)=>{
        setSelectedTransactionType(value)
    }

    const updateSelectedSortOption = (value: IDropdownOption) => {
        setSelectedSortOption(value)
    }

    return <div className="w-full flex flex-col">
        <div className="flex w-full items-center ">
        <h1 className="text-2xl md:text-3xl xlg:text-4xl text-white font-bold mt-8 mb-4 mr-auto break-words">{desiredTitle? desiredTitle: 'Transactions'}</h1>
        <div className="ml-2">
            <Dropdown options={sortOption} onSelect={updateSelectedSortOption} initialValue={selectedSortOption}/>
        </div>
        </div>
        <div className="flex w-full mb-4">
            <MultiSwitch onCallback={updateSelectedTransactionType} initialValue={selectedTransactionType} values={transactionType}/>
        </div>
        {
            filteredTransactions.length == 0? <div className="flex min-h-64 bg-black opacity-30 rounded-xl w-full items-center justify-center"><h1 className="text-center text-white text-xl">Belum ada transaksi</h1></div>   :
            filteredTransactions.map((transaction, index)=> {
                return <TransactionTile onFetchBack={fetchDatabase} key={`${index}-transaction-tile`} 
                    transaction={transaction} initialShowLess={index==0? false:true}/>
            })
        }
    </div>
}

export default TransactionSection