import { ITransaction } from "./ITransaction";

export interface GroupedTransactions {
    [key: string]: {
        [key: string]: ITransaction[];
    };
}