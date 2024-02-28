import { useEffect, useRef } from "react";
import { ITextArea } from "./interface/ITextArea";

const TextArea : React.FC<ITextArea> = ({textfieldKey, value ,  onChangeValue, placeholder='', readonly}) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.value = value
        }
    },[value])
    return (
        <div className="mb-4 ">
        {textfieldKey && <label className='mb-2 text-white text-sm'>{textfieldKey}</label>}
        <div className="relative">
        <textarea
        readOnly={readonly}
        placeholder={placeholder}
        className="border border-neutral-700 rounded-md w mt-1 w-full min-h-32 text-white p-3  bg-neutral-900"
        ref={inputRef}
        onChange={(e)=> onChangeValue(e.target.value)}
        />
        </div>
        
    </div>
    )
}

export default TextArea