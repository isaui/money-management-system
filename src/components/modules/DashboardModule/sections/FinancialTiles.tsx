import Stack from "@/components/elements/Stack"
import { useState } from "react"
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi"
import { GrMoney } from "react-icons/gr"
import IncomePopup from "../module-elements/IncomePopup"
import OutcomePopup from "../module-elements/OutcomePopup"
import BalancePopup from "../module-elements/BalancePopup"
import { IFinancialTiles } from "../interface/IFinancialTiles"
import { useProductContext } from "@/components/contexts/ProductContext"
import { calculateTransaction } from "@/utilities/calculateTransaction"


const FinancialTiles = () => {

    const {fetchDatabase, balanceTransactions, incomeTransactions, outcomeTransactions} = useProductContext()
    
    const [isIncomePopupOpen, setIncomePopupOpen] = useState<boolean>(false)
    const [isOutcomePopupOpen, setOutcomePopupOpen] = useState<boolean>(false)
    const [isBalancePopupOpen, setIsBalancePopupOpen] = useState<boolean>(false)
    const currentBalance = balanceTransactions.length == 0? '0' : balanceTransactions[0].price
    const incomeTotal = calculateTransaction(incomeTransactions)
    const outcomeTotal = calculateTransaction(outcomeTransactions)

    const openIncomePopup = () => {
        setIncomePopupOpen(true)
    }
    const openOutcomePopup = () => {
        setOutcomePopupOpen(true)
    }
    const openBalancePopup = () => {
        setIsBalancePopupOpen(true)
    }
    return <div className="flex flex-col w-full">
        <div className={` fixed z-30 top-1/2  -translate-y-1/2 transform transition-transform duration-300 ease-in-out ${
                    isIncomePopupOpen ? 'left-1/2 -translate-x-1/2' : 'right-0 translate-x-full'
            }`}>
                <IncomePopup title="Tambah Income" onCancel={()=>{setIncomePopupOpen(false)}} onSuccess={()=>{
                    setIncomePopupOpen(false)
                    fetchDatabase()
                    }}/>
        </div>
        <div className={` fixed z-30 top-1/2  -translate-y-1/2 transform transition-transform duration-300 ease-in-out ${
                    isOutcomePopupOpen ? 'left-1/2 -translate-x-1/2' : 'right-0 translate-x-full'
            }`}>
                <OutcomePopup title="Tambah Outcome" onCancel={()=>{setOutcomePopupOpen(false)}} onSuccess={()=>{
                    setOutcomePopupOpen(false)
                    fetchDatabase()}}/>
        </div>
        <div className={` fixed z-30 top-1/2  -translate-y-1/2 transform transition-transform duration-300 ease-in-out ${
                    isBalancePopupOpen ? 'left-1/2 -translate-x-1/2' : 'right-0 translate-x-full'
            }`}>
                <BalancePopup currentBalance={currentBalance} title="Perbarui Balance" onCancel={()=>{setIsBalancePopupOpen(false)}} onSuccess={()=>{
                    setIsBalancePopupOpen(false)
                    fetchDatabase()
                    }}/>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 w-full gap-x-4 gap-y-4">
        <Stack className="min-h-32  overflow-hidden col-span-2 xl:col-span-1 bg-indigo-800 rounded-xl p-4 linear-gradient-dark-blue border-2 border-blue-400">
            <div className="flex flex-col w-full   items-start h-full">
            <div className="flex w-full  mb-4  items-center">
                <div className="p-2 mr-2 rounded-full bg-pink-700  text-white text-lg  flex justify-center items-center text-center">
                    <GrMoney/>
                </div>
                <h1 className="text-sm text-gray-400">Balance</h1>
                <div className="ml-auto flex items-center">
                    <button onClick={openBalancePopup} className="text-xs hover:bg-blue-800 text-center mr-2 rounded-md px-2 py-1 border-2 border-white text-white">Update</button>
                    
                </div>
            </div>
            <div className="ml-0">
                <h1 className="text-center text-2xl md:text-4xl font-bold">{'Rp'+currentBalance}</h1>
            </div>
            </div>
            <div className="w-full h-full shine overflow-hidden"></div>
        </Stack>
        <Stack className="min-h-32  overflow-hidden  col-span-1 bg-indigo-800 rounded-xl p-4 linear-gradient-dark-blue border-2 border-blue-400">
            <div className="flex flex-col w-full   items-start h-full">
            <div className="flex w-full  mb-2 md:mb-4  items-center">
                <div className="p-2 mr-2 rounded-full bg-pink-700  text-white text-lg  flex justify-center items-center text-center">
                    <GiReceiveMoney/>
                </div>
                <h1 className="text-sm text-gray-400">Income</h1>
                <div className="ml-auto md:flex items-center hidden ">
                    <button onClick={openIncomePopup} className="text-xs hover:bg-blue-800 text-center mr-2 rounded-md px-2 py-1 border-2 border-white text-white">Add</button>
                    
                </div>
            </div>
            <div className="ml-0 mb-2">
                <h1 className="text-center text-xl md:text-4xl font-bold">Rp{incomeTotal}</h1>
            </div>
            <div className="mt-auto flex md:hidden items-center justify-start w-full ">
                    <button onClick={openIncomePopup} className="text-xs hover:bg-blue-800 text-center mr-2 rounded-md px-2 py-1 border-2 border-white text-white">Add</button>
                    
                </div>
            </div>
            <div className="w-full h-full shine overflow-hidden"></div>
        </Stack>
        <Stack className="min-h-32  overflow-hidden  col-span-1 bg-indigo-800 rounded-xl p-4 linear-gradient-dark-blue border-2 border-blue-400">
            <div className="flex flex-col w-full   items-start h-full">
            <div className="flex w-full  mb-2 md:mb-4  items-center">
                <div className="p-2 mr-2 rounded-full bg-pink-700  text-white text-lg  flex justify-center items-center text-center">
                    <GiPayMoney/>
                </div>
                <h1 className="text-sm text-gray-400">Outcome</h1>
                <div className="ml-auto md:flex items-center hidden ">
                    <button onClick={openOutcomePopup} className="text-xs hover:bg-blue-800 text-center mr-2 rounded-md px-2 py-1 border-2 border-white text-white">Add</button>
                    
                </div>
            </div>
            <div className="ml-0 mb-2">
                <h1 className="text-center text-xl md:text-4xl font-bold">Rp{outcomeTotal}</h1>
            </div>
            <div className="mt-auto flex md:hidden items-center justify-start w-full ">
                    <button onClick={openOutcomePopup} className="text-xs hover:bg-blue-800 text-center mr-2 rounded-md px-2 py-1 border-2 border-white text-white">Add</button>
                    
                </div>
            </div>
            <div className="absolute w-full h-full shine overflow-hidden"></div>
        </Stack>
    </div>
    </div>
}

export default FinancialTiles