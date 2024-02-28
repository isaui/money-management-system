interface ISidebarContext {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    currentPageTitle: string;
    setCurrentPageTitle: (title: string) => void;
}

export default ISidebarContext