import Dropdown from "@/components/elements/Dropdown"
import { ITransaction } from "../interface/ITransaction"
import TransactionTile from "../module-elements/TransactionTile"
import { IDropdownOption } from "@/components/elements/interface/IDropdownOption"
import MultiSwitch from "@/components/elements/MultiSwitch"
import { useState } from "react"

const transactionDummy: ITransaction[] = [
    {
        label: 'Income',
        imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg',
        title: 'Korupsi Makan Siang Gratis',
        note: 'Haram banget sumpah program gaje',
        price: '276000',
        time: new Date('2024-05-05T07:00:00')

    }, 
    {
        label: 'Outcome',
        imageUrl: '',
        title: 'Megalodon Skuy',
        note: 'Haram banget sumpah program gaje',
        price: '276000',
        time: new Date('2024-05-05T07:00:00')
    }
]

const sortOption: IDropdownOption[] = [
    {label: "Terbaru", value: "terbaru"},
    {label:"Terlama", value: "terlama"}
]
const transactionType: string[] = ["Semua","Income","Outcome", "Self Changed Balance"]

const TransactionSection = () => {
    const [selectedTransactionType, setSelectedTransactionType] = useState<string>(transactionType[0])
    const [selectedSortOption, setSelectedSortOption] = useState<IDropdownOption>(sortOption[0])

    const updateSelectedTransactionType = (value:string)=>{
        setSelectedTransactionType(value)
    }

    const updateSelectedSortOption = (value: IDropdownOption) => {
        setSelectedSortOption(value)
    }
    return <div className="w-full flex flex-col">
        <div className="flex w-full items-center ">
        <h1 className="text-2xl md:text-3xl xlg:text-4xl text-white font-bold mt-8 mb-4 mr-auto break-words">Transactions</h1>
        <div className="ml-2">
            <Dropdown options={sortOption} onSelect={updateSelectedSortOption} initialValue={selectedSortOption}/>
        </div>
        </div>
        <div className="flex w-full mb-4">
            <MultiSwitch onCallback={updateSelectedTransactionType} initialValue={selectedTransactionType} values={transactionType}/>
        </div>
        <TransactionTile transaction={transactionDummy[0]} initialShowLess={false}/>
        <TransactionTile transaction={transactionDummy[1]} initialShowLess={true}/>
    </div>
}

export default TransactionSection