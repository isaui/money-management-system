import { ITransaction } from "../../../contexts/interface/ITransaction";

export interface GroupedTransactions {
    [key: string]: {
        [key: string]: ITransaction[];
    };
}