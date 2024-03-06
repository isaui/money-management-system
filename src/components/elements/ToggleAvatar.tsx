'use client'
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IToggleAvatar } from "./interface/IToggleAvatar";
import { MdHome, MdOutlineDashboard } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
const ToggleAvatar: React.FC<IToggleAvatar> = ({ src, alt, isOpen, onToggle }) => {
    const ref = useRef<HTMLDivElement>(null);
    const {logoutUser} = useAuth()
    const router = useRouter()
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if(isOpen){
          onToggle()
        }
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const redirect= (url:string)=>{
      router.push(url)
    }

    return (
      <div className="flex items-center relative" onClick={()=>{
        onToggle()
      }}>
        {
          isOpen && <div ref={ref} className="absolute top-12 right-8 rounded-xl z-20 min-w-8   bg-indigo-950 flex flex-col py-2">
          <div onClick={()=>{
            redirect('/')
          }} className="flex w-full items-center hover:bg-indigo-600 mb-2 px-4 py-2 rounded-md">
            <MdHome className="text-lg mr-2"/>
            <p>Home</p>
          </div>
          <div className="w-full flex px-1">
            <hr className="w-full border border-pink-700 rounded-full"/>
          </div>
          <div onClick={()=>{
            redirect('/dashboard')
          }} className="flex w-full items-center hover:bg-indigo-600 my-2 px-4 py-2 rounded-md">
            <MdOutlineDashboard className="text-lg mr-2"/>
            <p>Dashboard</p>
          </div>
          <div className="w-full flex px-1">
            <hr className="w-full border border-pink-700 rounded-full"/>
          </div>
          <div onClick={logoutUser} className="flex w-full items-center hover:bg-indigo-600 mt-2 px-4 py-2 rounded-md">
            <FaArrowLeft className="text-lg mr-2"/>
            <p>Logout</p>
          </div>
        </div>
        }
        <img
          className="rounded-full w-10 h-10"
          src={src}
          alt={alt}
        />
        {isOpen ? (
          <FaChevronUp className="ml-2 text-white text-xl cursor-pointer" onClick={()=>{}} />
        ) : (
          <FaChevronDown className="ml-2 text-white text-xl cursor-pointer" onClick={()=>{}} />
        )}
      </div>
      
    );
  };
  
  export default ToggleAvatar;