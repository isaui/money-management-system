"use client"
import Header from "@/components/elements/Header"
import SidebarLayout from "@/components/layouts/SidebarLayout"
import TransactionSection from "../../embed-modules/TransactionModule/sections/TransactionSection"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/components/contexts/AuthContext"
import DontHaveAccess from "@/components/elements/DontHaveAccess"



const SearchModule = () => {
    const {user} = useAuth()
    const params = useSearchParams()
    const searchString = params.get('q')
    return <SidebarLayout>
        <div className="flex flex-col  w-full h-full">
        <div className="p-4 w-full flex flex-col h-full mx-auto">
           <div className="flex max-w-7xl  justify-center  mx-auto w-full">
            <Header includeSearchBar={true} includeSidebarMenu={true} />
            </div>
            <div className="flex flex-col w-full mx-auto overflow-y-auto pt-4">
               <div className="flex flex-col w-full max-w-7xl mx-auto">
                {user? <div className="flex mx-auto w-full max-w-7xl flex-col">
                {
                    searchString && <div className="flex w-full text-white mb-2">
                        <h1>Hasil pencarian untuk <span className="text-blue-500">{searchString}</span></h1>
                    </div>
                }
               <TransactionSection desiredOutputMatching={searchString? searchString : undefined}
                desiredTitle={searchString?"Hasil Pencarian":"Cari Transaksi"}/>
               </div> : <DontHaveAccess/>}
               </div>
            </div>
        </div>
        </div>
    </SidebarLayout>
}
export default SearchModule