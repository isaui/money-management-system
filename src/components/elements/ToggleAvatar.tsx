'use client'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IToggleAvatar } from "./interface/IToggleAvatar";
const RoundedAvatar: React.FC<IToggleAvatar> = ({ src, alt, isOpen, onToggle }) => {
    return (
      <div className="flex items-center" onClick={()=>{
        onToggle()
      }}>
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
  
  export default RoundedAvatar;