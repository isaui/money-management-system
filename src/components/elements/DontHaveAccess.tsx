import { useState } from "react"
import AuthPopup from "./AuthPopup"
import LoadingButton from "./LoadingButton"

const DontHaveAccess = () => {

    const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false)
    const [isLoginDisplayInit, setIsLoginDisplayInit] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    return <div className="grow  overflow-x-hidden my-auto h-full min-h-[70vh]  flex flex-col md:flex-row w-full  justify-center items-center px-4">
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
        <div className="h-48 md:h-72 md:min-h-72 md:min-w-64">
            <img src="/waifu.png" className="opacity-90 h-48 md:h-72 md:min-h-72 object-contain" alt="" />
        </div>
        <div className="grow flex flex-col mt-6 md:mt-0">
            <h1 className="text-red-400 text-4xl md:text-4xl lg:text-6xl mb-6 font-bold text-center md:text-left">401</h1>
            <h1 className="mb-6 text-center md:text-justify text-base md:text-lg">Kyaaa, Maaf km tidak mempunyai akses ke page ini. Tolong Sign In atau Sign Up dulu.</h1>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 w-full overflow-x-hidden  md:space-x-6">
            <div className="flex w-full">
            <button onClick={()=>{   
                setIsLoginDisplayInit(true)
                setIsAuthOpen(true)   
            }} 
            className="px-4 py-2 auth-popup-btn grow font-bold rounded-md">Sign In</button>
            </div>
            <div className="flex w-full">
            <button onClick={()=>{
                setIsLoginDisplayInit(false)
                setIsAuthOpen(true)}} 
            className="px-4 py-2 text-white border-2 border-pink-700 grow font-bold rounded-md hover:bg-pink-800">Sign Up</button>
            </div>
            </div>
        </div>
    </div>
}

export default DontHaveAccess