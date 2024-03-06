import { useEffect, useRef, useState } from "react";
import { ITransactionPopup } from "../interface/ITransactionPopup"
import Stack from "@/components/elements/Stack";
import { IoCloseCircle } from "react-icons/io5";
import TextField from "@/components/elements/TextField";
import {  FaRupiahSign } from "react-icons/fa6";
import { toast } from "react-toastify";
import { IBalancePopup } from "../interface/IBalancePopup";
import { useAuth } from "@/components/contexts/AuthContext";
import axios from "axios";
import generateTimestampISO8601WIB from "@/utilities/generateTimestamp";


const BalancePopup: React.FC<IBalancePopup> = ({onCancel, onSuccess, title, currentBalance}) => {
    const addPopupRef = useRef<HTMLDivElement>(null)
    const {user} = useAuth()
    const balancePreviousAmountRef = useRef<string>(currentBalance)
    const balanceAfterAmountRef = useRef<string>('')
    const [render, setRender] = useState<boolean>(false)
    

    const renderLayer = () => {
        setRender(prevState => !prevState);
    };

    

    useEffect(()=>{
        balancePreviousAmountRef.current = currentBalance
    },[currentBalance])

    useEffect(()=>{
        balanceAfterAmountRef.current = ''
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
        if(balanceAfterAmountRef.current.trim().length == 0){
            toast.error("Maaf balance terbaru wajib diisi")
            return false
        }
        return true
    }
    const updateBalance = async () => {
        if(validate()){
            toast("Mengedit balance...")
            const queryString = `
                    UPDATE INCOME
                    SET is_affecting = false WHERE user_id = '${user?.userId}';
                    
                    UPDATE EXPENSE
                    SET is_affecting = false WHERE user_id = '${user?.userId}';
                    
                    INSERT INTO BALANCE (user_id, amount, transaction_time, related_update)
                    VALUES ('${user?.userId}', '${balanceAfterAmountRef.current}', '${generateTimestampISO8601WIB()}', FALSE);
                    `;
            await axios.post('/api/query',{
                queryString: queryString
            })
            toast("Berhasil mengedit balance...")
            onSuccess()
        }
        
    }

    const cancelInput = () => {
        renderLayer()

        onCancel()

    }
    return <Stack  className="auth-popup rounded-2xl   max-w-md min-w-72 md:min-w-[32rem] min-h-64 transition-height duration-700 ease-in-out">
    <div ref={addPopupRef} className="flex flex-col max-w-md min-w-72 min-h-64 md:min-w-[32rem] overflow-y-auto  p-8 transition-height duration-700 ease-in-out">
        <h1 className="text-xl font-bold text-white mb-4">{title}</h1>
        {
           <div className="flex flex-col w-full">
                <TextField textfieldKey="Previous Balance" isNumber={true} onChangeValue={(text:string)=>{
                    balancePreviousAmountRef.current = text
                }} 
                isPassword={false} readonly={true}  
                icon={<FaRupiahSign/>} value={balancePreviousAmountRef.current}/>

                <TextField textfieldKey="Updated Balance" onChangeValue={(text:string)=>{
                    balanceAfterAmountRef.current = text
                }} 
                isPassword={false} isNumber={true} readonly={false} placeholder="Masukkan nominal balance yang baru (dalam rupiah)" 
                icon={<FaRupiahSign/>} value={balanceAfterAmountRef.current}/>
           </div>
        }
        
     
        
        <div className="mt-auto flex text-center justify-center space-x-6 ">
                <button onClick={cancelInput} className="px-4 py-2 auth-popup-btn w-full rounded-2xl">CANCEL</button> 
                <button onClick={updateBalance} className="px-4 py-2 auth-popup-btn w-full rounded-2xl">UPDATE</button>
            </div>
    </div>
    <div className="ml-auto mt-2 mr-2">
        <button onClick={cancelInput} className="text-2xl ml-auto"><IoCloseCircle/></button>
    </div>
</Stack>
}

export default BalancePopup