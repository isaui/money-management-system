import { IBalance } from "./IBalance";

export interface IFinancialTiles {
    currentBalance:IBalance|null
    incomeTotal: string 
    outcomeTotal: string
    onFetchCallBack: () => void
}