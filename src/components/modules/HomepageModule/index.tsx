"use client"
import Header from "@/components/elements/Header"
import SidebarLayout from "@/components/layouts/SidebarLayout"
import GetStartedSection from "./sections/GetStartedSection"
import FeatureSection from "./sections/FeatureSection"

const HomepageModule = () => {
    return <SidebarLayout>
        <div className="flex flex-col  w-full h-full">
        <div className="p-4 w-full flex flex-col h-full mx-auto">
           <div className="flex max-w-7xl  justify-center  mx-auto w-full">
            <Header includeSearchBar={false} includeSidebarMenu={true} />
            </div>
            <div className="flex flex-col w-full mx-auto overflow-y-auto pt-4">
                <GetStartedSection/>
                <FeatureSection/>
            </div>
        </div>
        </div>
    </SidebarLayout>
}
export default HomepageModule