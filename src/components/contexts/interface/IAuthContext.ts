import { IUser } from "./IUser"

export interface IAuthContext {
    user: IUser | null,
    signInUser: (user: IUser) => void
    logoutUser: () => void
}