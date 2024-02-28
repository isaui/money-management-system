import Stack from "@/components/elements/Stack"
import { IoCloseCircle } from "react-icons/io5"
import { IDeletePopup } from "./interface/IDeletePopup"
import { useEffect, useRef } from "react"

const DeletePopup: React.FC<IDeletePopup> = ({onCancel, onDelete, title, content}) => {
    const deletePopupRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (deletePopupRef.current && !deletePopupRef.current.contains(event.target as Node)) {
                onCancel()
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return <Stack  className="auth-popup rounded-2xl   max-w-md min-w-72 md:min-w-[32rem] min-h-64 transition-height duration-700 ease-in-out">
    <div ref={deletePopupRef} className="flex flex-col max-w-md min-w-72 min-h-64 md:min-w-[32rem] overflow-y-auto  p-8 transition-height duration-700 ease-in-out">
        <h1 className="text-xl font-bold text-white mb-4">{title}</h1>
        <p className="text-sm">{content}</p>
        <div className="mt-auto flex text-center justify-center space-x-6 ">
                <button onClick={onCancel} className="px-4 py-2 auth-popup-btn w-full rounded-2xl">KEMBALI</button> 
                <button onClick={onDelete} className="px-4 py-2 auth-popup-btn w-full rounded-2xl">HAPUS</button>
            </div>
    </div>
    <div className="ml-auto mt-2 mr-2">
        <button onClick={()=>{
            onCancel()
        }} className="text-2xl ml-auto"><IoCloseCircle/></button>
    </div>
</Stack>
}

export default DeletePopup