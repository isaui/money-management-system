import { useState } from "react"
import AuthPopup from "./AuthPopup"
import LoadingButton from "./LoadingButton"

const DontHaveAccess = () => {

    const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false)
    const [isLoginDisplayInit, setIsLoginDisplayInit] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    return <div className="grow  overflow-x-hidden my-auto h-full min-h-[70vh]  flex flex-col justify-center items-center px-4">
        {
            isLoading && <LoadingButton/>
        }
        <div className={` fixed z-30 top-1/2 overflow-x-hidden   -translate-y-1/2 transform transition-transform duration-300 ease-in-out ${
                    isAuthOpen ? 'left-1/2 -translate-x-1/2' : 'right-0 translate-x-full'
            }`}>
                <AuthPopup onFinish={()=>{
                    setIsLoading(false)
                }} isLoginDisplayInit={isLoginDisplayInit} onSubmit={function (): void {
                    setIsAuthOpen(false)
                    setIsLoading(true)
                } } onCancel={function (): void {
                    setIsAuthOpen(false)
                } }/>
            </div>
        <h1 className="mb-6 text-center">Maaf Anda tidak mempunyai akses ke page ini. Tolong login atau register dulu.</h1>
        <div className="flex items-center justify-center w-full overflow-x-hidden  space-x-6">
        <button onClick={()=>{   
            setIsLoginDisplayInit(true)
            setIsAuthOpen(true)   
        }} 
        className="px-4 py-2 auth-popup-btn font-bold rounded-md">LOGIN</button>
        <button onClick={()=>{
            setIsLoginDisplayInit(false)
            setIsAuthOpen(true)}} 
        className="px-4 py-2 auth-popup-btn font-bold rounded-md">REGISTER</button>
        </div>
    </div>
}

export default DontHaveAccess