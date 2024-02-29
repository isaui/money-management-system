import React, { useEffect, useState } from "react";
import { IOverviewData } from "../interface/IOverviewData";
import LineGraph from "../module-elements/LineGraph"
import { IFinancialOverview } from "../interface/IFinancialOverview";
import { GroupedTransactions } from "../interface/IGroupedTransaction";
import { groupTransactionsByDayAndLabel, groupTransactionsByMonthAndLabel, groupTransactionsByWeekAndLabel } from "@/utilities/groupedTransaction";
import { calculateTransaction } from "@/utilities/calculateTransaction";

const FinancialOverview : React.FC<IFinancialOverview> = ({transactions}) => {
    const [currentTransactionDataTable, setCurrentTransactionDataTable] = 
        useState<GroupedTransactions>(groupTransactionsByMonthAndLabel(transactions))
    const [overviewList, setOverviewList] = useState<IOverviewData[]>([])
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>('Bulanan')
    const getOverviewData  = () => {
        const updatedOverviewList : IOverviewData[] = []
        Object.keys(currentTransactionDataTable).forEach((timeKey, index)=>{
            const labelledData = currentTransactionDataTable[timeKey]
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
        setOverviewList(updatedOverviewList)
    }

    useEffect(()=>{
        groupTransactions(selectedTimeRange)
    },[transactions, selectedTimeRange])

    useEffect(()=>{
        getOverviewData()
    },[currentTransactionDataTable])

    const groupTransactions = (label: string) => {
        console.log('here')
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
       
        setCurrentTransactionDataTable(data)
    }
    return <div className="flex flex-col w-full">
        <h1 className="text-2xl md:text-3xl xlg:text-4xl text-white font-bold my-8">Overview</h1>
        <LineGraph dropdownValues={['Harian', 'Mingguan', 'Bulanan']} onClickDropdownValue={function (value: string): void {
            console.log(value)
            setSelectedTimeRange(value)
        } } yAxisLabel={"amount"} lineValues={overviewList} lineLabels={['income', 'outcome', 'balance']} xAxisLabel={"name"} lineColors={['#82ca9d', '#E35335', ' #8884d8']}/>
    </div>
}
//#82ca9d hijau, #8884d8 ungu, #E35335 orange
export default FinancialOverview