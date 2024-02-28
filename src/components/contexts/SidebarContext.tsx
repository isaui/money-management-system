import { ReactNode, createContext, useContext, useState } from "react";
import ISidebarContext from "./interface/ISidebarContext";

const SidebarContext = createContext<ISidebarContext | undefined>(undefined);

export const SidebarProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPageTitle, setCurrentPageTitle] = useState('');
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, currentPageTitle, setCurrentPageTitle }}>
        {children}
      </SidebarContext.Provider>
    );
  };

export const useSidebar = (): ISidebarContext => {
    const context = useContext(SidebarContext);
    if (!context) {
      throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
  };