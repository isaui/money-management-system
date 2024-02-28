'use client'
import { FaSearch } from "react-icons/fa"
import ToggleAvatar from "./ToggleAvatar"
import { IHeader } from "./interface/IHeader"
import { HiMenu } from "react-icons/hi"
import { useSidebar } from "../contexts/SidebarContext"
import { useRef, useState } from "react"
import AuthPopup from "./AuthPopup"
import { useAuth } from "../contexts/AuthContext"

const Header: React.FC<IHeader> = ({includeSearchBar, includeSidebarMenu}) => {
    const {user} = useAuth();
    const { isSidebarOpen, toggleSidebar, currentPageTitle, setCurrentPageTitle } = useSidebar();
    const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false)
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false)

    const toggleSearchMobile = () => {
        setIsMobileSearchOpen(prev => !prev)
    }
    
    return (
        <div className="w-full  flex flex-col items-center justify-center ">
            <div className={`md:hidden   flex w-full min-w-[100vw]   bg-slate-900 transform transition-transform duration-300 ease-in-out ${
                    isMobileSearchOpen ? 'translate-y-0 mb-4 p-4 -mt-4' : '-translate-y-28 max-h-0'
            }`}>
                <div className="mx-auto flex  grow max-w-[54rem]  ">
                    <div className="ml-2 w-full flex items-center rounded-full border-2 border-blue-400">
                        <button className=" text-white font-bold py-2 px-4 rounded-l-full">
                            <FaSearch />
                        </button>
                        <input
                            className="py-2 px-4 rounded-r-full text-white w-full text-base bg-transparent   focus:outline-none"
                            type="text"
                            placeholder="Cari Pengeluaran atau Pemasukan..."
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
            {
                    includeSidebarMenu && <div className="mr-auto md:hidden">
                    <div onClick={()=>{
                        toggleSidebar()
                    }} className="md:hidden p-3 rounded-full  text-white text-lg items-center justify-center">
                        <HiMenu/>
                    </div>
                </div>
                }

                {
                    includeSearchBar && <div className="md:hidden ml-auto mr-2">
                        <button onClick={toggleSearchMobile} className="bg-pink-700 text-white font-bold flex items-center justify-center p-3 rounded-full">
                            <FaSearch />
                        </button>
                    </div>
                }
            
                {
                    includeSearchBar && <div className="md:ml-auto hidden md:flex  grow max-w-[54rem]  ">
                    <div className="ml-2 w-full flex items-center rounded-full border-2 border-blue-400">
                        <button className=" text-white font-bold py-2 px-4 rounded-l-full">
                            <FaSearch />
                        </button>
                        <input
                            className="py-2 px-4 rounded-r-full text-white w-full text-base bg-transparent   focus:outline-none"
                            type="text"
                            placeholder="Cari Pengeluaran atau Pemasukan..."
                        />
                    </div>
                </div>
                }
                <div className="md:ml-auto flex items-center">
                   
                    <div className="ml-2">
                        {!user? <button onClick={()=>{
                            setIsAuthOpen(true)
                        }} className="px-4 py-2 auth-popup-btn text-sm font-bold rounded-md">LOGIN</button>: <ToggleAvatar 
                        src={user.profilePicture} alt={"profile"} 
                        isOpen={false} 
                        onToggle={()=>{
                            
                        }}  />}
                    </div>
                </div>
            </div>
            <div className={` fixed z-30 top-1/2  -translate-y-1/2 transform transition-transform duration-300 ease-in-out ${
                    isAuthOpen ? 'left-1/2 -translate-x-1/2' : 'right-0 translate-x-full'
            }`}>
                <AuthPopup isLoginDisplayInit={true} onSubmit={function (): void {
                    setIsAuthOpen(false)
                } } onCancel={function (): void {
                    setIsAuthOpen(false)
                } }/>
            </div>
            
                
         </div>
    )
}

export default Header