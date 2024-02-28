import { useEffect, useRef } from "react";
import { ITextField } from "./interface/ITextField";

const TextField : React.FC<ITextField> = ({textfieldKey,  isNumber,value , icon , onChangeValue, placeholder='', isPassword, readonly}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.value = value
        }
    },[value])
    return (
        <div className="mb-4 ">
        {textfieldKey && <label className='mb-1 text-white text-sm'>{textfieldKey}</label>}
        <div className="relative">
        <input
        type= {isNumber? "number": isPassword? "password" : "text"}
        readOnly={readonly}
        placeholder={placeholder}
        className="border border-neutral-700 rounded-md w-full text-white pr-3 py-3 mt-1 pl-12 bg-neutral-900"
        ref={inputRef}
        onChange={(e)=> onChangeValue(e.target.value)}
      />
      <button
        className="absolute inset-y-0  left-0 flex  items-center px-3 text-neutral-400 hover:text-white focus:outline-none"
      >
        {icon }
      </button>
        </div>
        
    </div>
    )
}

export default TextField