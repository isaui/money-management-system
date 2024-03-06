'use client'
import React from "react";
import { useSidebar } from "../contexts/SidebarContext";
import Sidebar from "../elements/Sidebar";

const SidebarWrapper: React.FC<{ children: React.ReactNode, sidebar: React.ReactNode }> = ({ children, sidebar }) => {
    const { isSidebarOpen} = useSidebar();
    return (
        <div className="flex min-h-screen max-h-screen max-w-[100vw] overflow-x-hidden linear-gradient-indigo-to-purple">
        <div className={`fixed top-0 left-0 z-20 md:relative   transition-all duration-300 ${isSidebarOpen? 'flex w-[20%] translate-x-0 min-w-[18rem]' : ' -translate-x-[24rem] md:translate-x-0 flex md:w-[6rem]' }   h-screen`}>
            {sidebar}
        </div>
        <div className="grow overflow-y-auto overflow-x-hidden max-w-[100vw]">
          {children}
        </div>
      </div>
    
    );
 };

 const SidebarLayout : React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <SidebarWrapper sidebar={<Sidebar/>}>
            {children}
        </SidebarWrapper>
 }

 export default SidebarLayout