import { useEffect, useRef, useState } from "react";
import { ITransactionPopup } from "../interface/ITransactionPopup"
import Stack from "@/components/elements/Stack";
import { IoCloseCircle } from "react-icons/io5";
import TextField from "@/components/elements/TextField";
import TextArea from "@/components/elements/TextArea";
import { FaMoneyBillTransfer, FaRupiahSign } from "react-icons/fa6";
import UploadImage from "@/components/elements/UploadImage";
import { toast } from "react-toastify";
import { convertToHHmmss, convertToYYYYMMDD } from "@/utilities/TimeFormatter";
import { handleTimeChange } from "@/utilities/modifyTime";
import { handleDateChange } from "@/utilities/modifyDate";
import { useAuth } from "@/components/contexts/AuthContext";
import axios from "axios";

const OutcomePopup: React.FC<ITransactionPopup> = ({onCancel, onSuccess, title, transaction}) => {
    const {user} = useAuth()
    const [isFirstSection, setIsFirstSection] = useState<boolean>(true)
    const [image, setImage] = useState<string>('')
    const addPopupRef = useRef<HTMLDivElement>(null)
    const outcomeTitleRef = useRef<string>('')
    const outcomeAmountRef = useRef<string>('')
    const [transactionTime, setTransactionTime] = useState<Date>(new Date());
    const outcomeNoteRef = useRef<string>('')
    const [render, setRender] = useState<boolean>(false)
    const [agreed, setAgreed] = useState<boolean>(true);
    const renderLayer = () => {
        setRender(prevState => !prevState);
    };
    useEffect(()=>{
        if(transaction){
            outcomeTitleRef.current = transaction.title
            outcomeAmountRef.current = transaction.price
            outcomeNoteRef.current = transaction.note
            if(transaction.imageUrl){
                setImage(transaction.imageUrl)
            }
            setTransactionTime(transaction.time)
        }
        else{
            outcomeTitleRef.current = ''
            outcomeAmountRef.current = ''
            outcomeNoteRef.current = ''
            setImage('')
            setTransactionTime(new Date())
            setAgreed(true)
        }
    },[render])

    const handleAgreementChange = () => {
        setAgreed(!agreed);
      };
    
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
        if(outcomeTitleRef.current.trim().length == 0){
            toast.error("Maaf title wajib diisi")
            return false
        }
        if(outcomeAmountRef.current.trim().length == 0){
            toast.error("Maaf amount wajib diisi")
            return false
        }
        if(parseFloat(outcomeAmountRef.current) <= 0){
            toast.error("Maaf amount tidak boleh bernilai kurang dari atau sama dengan 0")
            return false
        }
        return true
    }
    const addOutcome = async () => {
        const isAccepted = validate()
        if(!isAccepted){
            return
        }
        if(!transaction){
            toast('Menambahkan Outcome...')
            const queryString = 
            `
            DO $$
            DECLARE 
                new_balance BIGINT;
            BEGIN
                -- Mendapatkan balance terbaru
                SELECT amount INTO new_balance FROM balance WHERE user_id = '${user?.userId}' ORDER BY transaction_time DESC LIMIT 1 FOR UPDATE;
                
                -- Menambahkan income baru
                INSERT INTO EXPENSE (user_id, expense_name, expense_thumbnail, expense_amount, expense_information, transaction_time, is_affecting)
                VALUES ('${user?.userId}', '${outcomeTitleRef.current}', '${image}', ${outcomeAmountRef.current}, '${outcomeNoteRef.current}', '${transactionTime.toISOString()}', ${agreed});
                
                -- Menambahkan balance baru
                INSERT INTO balance (user_id, amount, transaction_time)
                VALUES ('${user?.userId}', new_balance - ${outcomeAmountRef.current}, '${transactionTime.toISOString()}');
            END;
            $$;
            `
            await axios.post('/api/query', {queryString:queryString})
            toast('Berhasil menambahkan Outcome')
        }
        onSuccess()
        
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
                <TextField textfieldKey="Outcome Title" onChangeValue={(text:string)=>{
                    outcomeTitleRef.current = text
                }} 
                isPassword={false} readonly={false} placeholder="Masukkan judul pemasukan" 
                icon={<FaMoneyBillTransfer/>} value={outcomeTitleRef.current}/>
                <TextField textfieldKey="Amount" onChangeValue={(text:string)=>{
                    outcomeAmountRef.current = text
                }} 
                isPassword={false} isNumber={true} readonly={false} placeholder="Masukkan nominal (dalam rupiah)" 
                icon={<FaRupiahSign/>} value={outcomeAmountRef.current}/>

                <TextArea textfieldKey={"Additional Note"} onChangeValue={function (text: string): void {
                    outcomeNoteRef.current = text
            } } value={outcomeNoteRef.current} readonly={false} placeholder="Tuliskan note tambahan" />
            {!transaction && <label className="mb-2">
            <input type="checkbox" checked={agreed} onChange={handleAgreementChange} />
            Saya setuju bahwa data ini akan mempengaruhi saldo saya.
        </label>}
           </div>
        }
        
        {
            !isFirstSection && <div className="flex flex-col w-full mb-4">
                <h1 className="mb-2 text-sm text-white">Image</h1>
                <UploadImage onSuccess={(url : string)=>{
                    setImage(url)
                }} initialFile={image}/>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-2">
                    <div className="w-full">
                    <h1 className="text-white mb-2 text-sm">Tanggal</h1>
                    <input value={convertToYYYYMMDD(transactionTime)} onChange={(e)=>{
                        setTransactionTime(handleDateChange(transactionTime, e))
                    }}  className="w-full text-white rounded-md p-2 mb-2 bg-blue-900" type="date"/>
                    </div>
                    <div className="w-full ">
                        <h1 className="text-white mb-2 text-sm">Waktu</h1>
                        <input value={convertToHHmmss(transactionTime)} onChange={(e)=>{
                            setTransactionTime(handleTimeChange(transactionTime,e))
                        }} className="w-full text-white rounded-md p-2 mb-2 bg-blue-900" type="time"/>
                        </div>
                </div>
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
                        addOutcome()
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

export default OutcomePopup