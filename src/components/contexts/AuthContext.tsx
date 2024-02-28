import { ReactNode, createContext, useContext, useState } from "react";
import { IAuthContext } from "./interface/IAuthContext";
import { IUser } from "./interface/IUser";

const AuthContext = createContext<IAuthContext | undefined>(undefined);
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<IUser|null>(null)
    const signInUser = (nUser: IUser) => {
        setUser(nUser)
    }
    const logoutUser = () => {
        setUser(null)
    }
  
    return (
      <AuthContext.Provider value={{user, signInUser, logoutUser }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useSidebar must be used within a Auth Provider');
    }
    return context;
};