import { useEffect, useRef, useState } from "react";
import { ITransactionPopup } from "../interface/ITransactionPopup"
import Stack from "@/components/elements/Stack";
import { IoCloseCircle } from "react-icons/io5";
import TextField from "@/components/elements/TextField";
import TextArea from "@/components/elements/TextArea";
import { FaMoneyBillTransfer, FaRupiahSign } from "react-icons/fa6";
import UploadImage from "@/components/elements/UploadImage";
import { toast } from "react-toastify";

const IncomePopup: React.FC<ITransactionPopup> = ({onCancel, onSuccess, title, transaction}) => {
    const [isFirstSection, setIsFirstSection] = useState<boolean>(true)
    const [image, setImage] = useState<string>('')
    const addPopupRef = useRef<HTMLDivElement>(null)
    const incomeTitleRef = useRef<string>('')
    const incomeAmountRef = useRef<string>('')
    const incomeNoteRef = useRef<string>('')
    const [render, setRender] = useState<boolean>(false)

    const renderLayer = () => {
        setRender(prevState => !prevState);
    };

    useEffect(()=>{
        if(transaction){
            incomeTitleRef.current = transaction.title
            incomeAmountRef.current = transaction.price
            incomeNoteRef.current = transaction.note
            if(transaction.imageUrl){
                setImage(transaction.imageUrl)
            }
        }
        else{
            incomeTitleRef.current = ''
            incomeAmountRef.current = ''
            incomeNoteRef.current = ''
            setImage('')
        }
    },[render])
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (addPopupRef.current && !addPopupRef.current.contains(event.target as Node)) {
                cancelInput()
                
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const validate = () : boolean=> {
        if(incomeTitleRef.current.trim().length == 0){
            toast.error("Maaf title wajib diisi")
            return false
        }
        if(incomeAmountRef.current.trim().length == 0){
            toast.error("Maaf amount wajib diisi")
            return false
        }
        if(parseFloat(incomeAmountRef.current) <= 0){
            toast.error("Maaf amount tidak boleh bernilai kurang dari atau sama dengan 0")
            return false
        }
        return true
    }
    const addIncome = async () => {
        if(validate()){

            onSuccess()
        }
        
    }

    const cancelInput = () => {
        renderLayer()
        setIsFirstSection(true)
        onCancel()

    }
    return <Stack  className="auth-popup rounded-2xl   max-w-md min-w-72 md:min-w-[32rem] min-h-64 transition-height duration-700 ease-in-out">
    <div ref={addPopupRef} className="flex flex-col max-w-md min-w-72 min-h-64 md:min-w-[32rem] overflow-y-auto  p-8 transition-height duration-700 ease-in-out">
        <h1 className="text-xl font-bold text-white mb-4">{title}</h1>
        {
           isFirstSection && <div className="flex flex-col w-full">
                <TextField textfieldKey="Income Title" onChangeValue={(text:string)=>{
                    incomeTitleRef.current = text
                }} 
                isPassword={false} readonly={false} placeholder="Masukkan judul pemasukan" 
                icon={<FaMoneyBillTransfer/>} value={incomeTitleRef.current}/>
                <TextField textfieldKey="Amount" onChangeValue={(text:string)=>{
                    incomeAmountRef.current = text
                }} 
                isPassword={false} isNumber={true} readonly={false} placeholder="Masukkan nominal (dalam rupiah)" 
                icon={<FaRupiahSign/>} value={incomeAmountRef.current}/>
                <TextArea textfieldKey={"Additional Note"} onChangeValue={function (text: string): void {
                    incomeNoteRef.current = text
            } } value={incomeNoteRef.current} readonly={false} placeholder="Tuliskan note tambahan" />
           </div>
        }
        
        {
            !isFirstSection && <div className="flex flex-col w-full mb-4">
                <h1 className="mb-2 text-sm text-white">Image</h1>
                <UploadImage onSuccess={(url : string)=>{
                    setImage(url)
                }} initialFile={image}/>
            </div>
        }
        
        <div className="mt-auto flex text-center justify-center space-x-6 ">
                <button onClick={()=>{
                    if(isFirstSection){
                        cancelInput()
                    }
                    else{
                        setIsFirstSection(true)
                    }
                }} className="px-4 py-2 auth-popup-btn w-full rounded-2xl">{isFirstSection?"CANCEL":"BACK"}</button> 
                <button onClick={()=>{
                    if(isFirstSection){
                        setIsFirstSection(false)
                    }
                    else{
                        addIncome()
                    }
                }} className="px-4 py-2 auth-popup-btn w-full rounded-2xl">{isFirstSection?"NEXT": transaction?"UPDATE":"CREATE"}</button>
            </div>
    </div>
    <div className="ml-auto mt-2 mr-2">
        <button onClick={()=>{
            cancelInput()
        }} className="text-2xl ml-auto"><IoCloseCircle/></button>
    </div>
</Stack>
}

export default IncomePopup