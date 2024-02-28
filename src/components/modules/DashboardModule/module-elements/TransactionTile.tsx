import TextArea from "@/components/elements/TextArea"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi"
import { ITransactionTile } from "../interface/ITransactionTile"
import { useState } from "react"
import { GrMoney } from "react-icons/gr"
import { parseDateToWIB } from "@/utilities/parseDateToWIB"
import DeletePopup from "@/components/elements/DeletePopup"
import IncomePopup from "./IncomePopup"
import OutcomePopup from "./OutcomePopup"

const TransactionTile: React.FC<ITransactionTile> = ({
    transaction, initialShowLess
}) => {
    const [showLess, setShowLess] = useState<boolean>(initialShowLess)
    const [isDeletePopupOpen, setIsDeletePopupOpen]  = useState<boolean>(false)
    const [isTransactionPopupOpen, setIsTransactionPopupOpen] = useState<boolean>(false)
    const toggleShowLess = () => {
        setShowLess(prev => !prev)
    }
    const generateIcon = (identifier:string) : React.ReactNode => {
        if(identifier == 'Income'){
            return <GiReceiveMoney/>
        }
        else if( identifier == 'Outcome'){
            return <GiPayMoney/>
        }
        else{
            return <GrMoney/>
        }
    }

    const onDelete = () => {
        setIsDeletePopupOpen(true)
    }

    const onUpdate = async () => {
        setIsTransactionPopupOpen(true)
    }

    return <div className="flex flex-col  w-full min-h-16 linear-gradient-dark-blue mb-4 p-4 rounded-xl">
        <div className={` fixed z-30 top-1/2  -translate-y-1/2 transform transition-transform duration-300 ease-in-out ${
                    isDeletePopupOpen ? 'left-1/2 -translate-x-1/2' : 'right-0 translate-x-full'
            }`}>
                <DeletePopup onCancel={function (): void {
                 setIsDeletePopupOpen(false)
            } } onDelete={function (): void {
                
            } } title={"Hapus Transaksi Ini?"} content={"Apakah Anda yakin untuk menghapus transaksi ini? Action ini tidak dapat dikembalikan."}/>
            </div>

            <div className={` fixed z-30 top-1/2  -translate-y-1/2 transform transition-transform duration-300 ease-in-out ${
                    isTransactionPopupOpen ? 'left-1/2 -translate-x-1/2' : 'right-0 translate-x-full'
            }`}>
                {transaction.label == "Income" && <IncomePopup
                transaction={transaction}
                onCancel={() => {
                    setIsTransactionPopupOpen(false)
                } } onSuccess={()=>{
                    setIsTransactionPopupOpen(false)
                } } title={"Edit Income"}/>}
                {
                    transaction.label == "Outcome" && <OutcomePopup
                    transaction={transaction}
                    onCancel={() => {
                        setIsTransactionPopupOpen(false)
                    } } onSuccess={()=>{
                        setIsTransactionPopupOpen(false)
                    } } title={"Edit Outcome"}/>
                }
            </div>

            
        <div className="flex items-center mb-2">
            <div className="flex items-center grow">
                <div className="rounded-full p-1 text-white bg-pink-700 text-base">
                {generateIcon(transaction.label)}
                </div>
                <p className="text-gray-400 text-sm ml-2 break-words">{transaction.label}</p>
            </div>
            <div onClick={toggleShowLess} className="ml-2 text-3xl text-white">
                 <BiChevronDown className={`${showLess? '': 'transform rotate-180'}`}/>
            </div>
        </div>
        <div className="mb-2">
            <h1 className="text-lg font-semibold break-words">{transaction.title}</h1>
        </div>
        <div className="mb-2">
            <h1 className="text-lg font-semibold break-words text-blue-300">Rp {transaction.price}</h1>
        </div>
        {
            !showLess && <div className="flex flex-col w-full">
                <p className="text-sm  mb-2 text-gray-400">Image</p>
                {
                    transaction.imageUrl.length > 0 ? <div className="h-32 w-fit rounded-xl bg-red-500 mb-2">
                    <img className="w-full h-full rounded-xl object-contain"src={transaction.imageUrl} alt="" />
                </div> : <p className="text-sm  mb-2 text-white" > - </p>
                }
                <p className="text-sm  mb-2 text-gray-400">Note</p>
                {transaction.note.length > 0? <TextArea textfieldKey={""} onChangeValue={function (text: string): void {
                } } value={transaction.note} readonly={true} /> : 
                <p className="text-sm  mb-2 text-white" > - </p>}
            </div>
        }
        <div className="flex w-full mt-auto justify-end items-center flex-wrap space-y-2">
            <div className="flex items-center mr-auto">
                <button onClick={onUpdate} className="text-sm hover:bg-slate-800 bg-slate-900 text-center mr-2 rounded-md px-2 py-1  text-white">Update</button>
                <button onClick={onDelete} className="text-sm bg-red-950 hover:bg-red-800 text-center rounded-md px-2 py-1 text-white">Delete</button>
            </div>
            <p className="ml-2 text-sm text-gray-400">{parseDateToWIB(transaction.time)}</p>
        </div>
    </div>
}
export default TransactionTile