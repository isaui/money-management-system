import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSidebar } from "../contexts/SidebarContext";
import { ISidebarContent } from "./interface/ISidebarContent";
import { BiHome, BiSearch } from "react-icons/bi";
import { MdApi, MdDashboard } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Sidebar: React.FC = () => {
    const { isSidebarOpen, toggleSidebar, currentPageTitle, setCurrentPageTitle } = useSidebar();
    const path = usePathname()
    const router = useRouter()
    useEffect(() => {
        // Mendapatkan path dari URL dan memperbarui judul halaman
        const matchedContent = content.find((item) => item.href === path);
        if (matchedContent) {
          setCurrentPageTitle(matchedContent.title);
          //toggleSidebar()
        }
      }, [path]);

    const content: Array<ISidebarContent> = [
        {
            title: 'Home',
            href: '/',
            icon: <BiHome title='Home' />
        },
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: <MdDashboard title='dashboard' />
        },
        {
            title: 'Search',
            href: '/search',
            icon: <BiSearch title='search' />
        },
     ];
  
    const handleNavigation = (title: string, path: string) => {
      if(title != currentPageTitle){
        router.push(path)
      }
      setCurrentPageTitle(title);
      
    };
  
    return (
      <div className=' w-full h-full max-h-screen  flex flex-col p-4'>

        <div className="w-full h-full flex- flex-col rounded-2xl linear-gradient-dark-blue p-4">
        <div className={`flex w-full ${isSidebarOpen? 'justify-between': 'justify-center'} items-center mb-4`}>
        {
            isSidebarOpen && <h1 className=' text-white text-xl md:text-2xl font-semibold whitespace-break-spaces break-words'>RFinance</h1>
        }
        <div onClick={toggleSidebar} className='ml-2 text-white text-lg'>
            {
                isSidebarOpen? <FaChevronLeft/> : <FaChevronRight/>
            }
        </div>
       
        </div>  
        <hr className='w-full border-indigo-400 border-2 rounded-full mb-4' />

        <div className='sidebar-content flex flex-col space-y-4 grow '>
            {
               isSidebarOpen &&  content.map((data)=>{
                    return <div onClick={()=>{
                        handleNavigation(data.title,data.href)
                    }} key={`data-${data.title}-sidebar-content`} className={`flex items-center w-full rounded-full py-2 px-4 ${currentPageTitle == data.title? 'bg-indigo-400': ''}`}>
                        <div className='mr-2 text-white text-xl'>
                            {data.icon}
                        </div>
                        <h1 className='text-left text-sm md:text-base text-white whitespace-break-spaces break-words'>{data.title}</h1>
                    </div>
                })
            }
            {
                !isSidebarOpen &&  content.map((data)=>{
                    return <div onClick={()=>{
                        handleNavigation(data.title,data.href)
                    }} key={`data-${data.title}-sidebar-content-hidden`} className={`flex items-center justify-center w-full rounded-full py-2 px-4 ${currentPageTitle == data.title? 'bg-indigo-400': ''}`}>
                        <div className=' text-white text-xl'>
                            {data.icon}
                        </div>
                        
                    </div>
                })
            }
        </div>
        </div>
      </div>
    );
  };

export default Sidebar