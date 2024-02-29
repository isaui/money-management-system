import React, { useEffect, useState } from "react";
import { IOverviewData } from "../interface/IOverviewData";
import LineGraph from "../module-elements/LineGraph"
import { GroupedTransactions } from "../interface/IGroupedTransaction";
import { groupTransactionsByDayAndLabel, groupTransactionsByMonthAndLabel, groupTransactionsByWeekAndLabel } from "@/utilities/groupedTransaction";
import { calculateTransaction } from "@/utilities/calculateTransaction";
import { useProductContext } from "@/components/contexts/ProductContext";
import { getAllTransactionsHistory } from "@/utilities/getTransactionsHistory";

const FinancialOverview = () => {

    const {incomeTransactions, outcomeTransactions, balanceTransactions} = useProductContext()
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>('Bulanan')
    const transactions = getAllTransactionsHistory([...incomeTransactions, ...outcomeTransactions, ...balanceTransactions])
    const groupTransactions = (label: string) : GroupedTransactions => {
        let data: GroupedTransactions = {}
        if(label == 'Harian'){
            data = groupTransactionsByDayAndLabel(transactions)
        }
        else if(label == 'Mingguan'){
            data = groupTransactionsByWeekAndLabel(transactions)
        }
        else{
            data = groupTransactionsByMonthAndLabel(transactions)
        }
       
        return data
    }
    const getOverviewData  = (groupData: GroupedTransactions) => {
        const updatedOverviewList : IOverviewData[] = []
        Object.keys(groupData).forEach((timeKey, index)=>{
            const labelledData = groupData[timeKey]
            const data : IOverviewData = {
                name: timeKey,
                income: 0,
                outcome: 0,
                balance: 0
            }
            Object.keys(labelledData).forEach((label,index)=>{
                const transactionList = labelledData[label]
                const amount = calculateTransaction(transactionList)
                if(label.toLowerCase() == 'income'){
                    data.income = amount
                }
                else if(label.toLowerCase() == 'outcome'){
                    data.outcome = amount
                }
                else{
                    data.balance = amount
                }
            })
            updatedOverviewList.push(data)
        })
        return updatedOverviewList
    }
    const overviewList = getOverviewData(groupTransactions(selectedTimeRange))

    return <div className="flex flex-col w-full">
        <h1 className="text-2xl md:text-3xl xlg:text-4xl text-white font-bold my-8">Overview</h1>
        <LineGraph dropdownValues={['Harian', 'Mingguan', 'Bulanan']} onClickDropdownValue={function (value: string): void {
            setSelectedTimeRange(value)
        } } yAxisLabel={"amount"} lineValues={overviewList} lineLabels={['income', 'outcome', 'balance']} xAxisLabel={"name"} lineColors={['#82ca9d', '#E35335', ' #8884d8']}/>
    </div>
}

export default FinancialOverview