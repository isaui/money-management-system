import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ITransaction } from '@/components/contexts/interface/ITransaction';
import { IProductContext } from './interface/IProductContext';
import { useAuth } from './AuthContext';
import axios from 'axios';




const ProductContext = createContext<IProductContext | undefined>(undefined);


export const ProductProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [incomeTransactions, setIncomeTransactions] = useState<ITransaction[]>([]);
  const [outcomeTransactions, setOutcomeTransactions] = useState<ITransaction[]>([]);
  const [balanceTransactions, setBalanceTransactions] = useState<ITransaction[]>([]);
  const {user} = useAuth()
  

  const clearAll = () => {
    setIncomeTransactions([])
    setOutcomeTransactions([])
    setBalanceTransactions([])
  };

  const fetchDatabase = () => {
    if(user == null) return
    Promise.all([fetchIncome(), fetchOutcome(), fetchBalance()])
  };

  const fetchIncome = async () => {
    const transactions: ITransaction[] = []
    const res = await axios.post('/api/query',{
        queryString:`SELECT i.income_id, i.income_name, i.income_thumbnail, i.income_information, i.income_amount, 
         i.transaction_time, i.is_affecting, b.amount
         FROM INCOME i 
         INNER JOIN BALANCE b
        ON i.prev_balance_id = b.balance_id 
        WHERE i.user_id ='${user?.userId}' ORDER BY i.transaction_time DESC;`
    })
    const rows = res.data.result.rows
    rows.forEach((entry:any) => {
        const transaction: ITransaction = {
            id: entry.income_id,
            label: "Income",
            title: entry.income_name,
            imageUrl: entry.income_thumbnail,
            note: entry.income_information,
            price: entry.income_amount,
            time: new Date(entry.transaction_time),
            isAffectingBalance: entry.is_affecting,
            prevTransactionAmount: entry.amount
        }
        transactions.push(transaction)
    });
  setIncomeTransactions(transactions)
  }
  const fetchOutcome = async () =>{
    const transactions: ITransaction[] = []
        const res = await axios.post('/api/query',{
            queryString:`SELECT e.expense_id, e.expense_name, e.expense_thumbnail, 
            e.expense_information, e.expense_amount, e.transaction_time, e.is_affecting, b.amount FROM EXPENSE e 
            INNER JOIN BALANCE b on e.prev_balance_id
             = b.balance_id WHERE e.user_id ='${user?.userId}' ORDER BY transaction_time DESC;`
        })
        const rows = res.data.result.rows
        rows.forEach((entry:any) => {
            const transaction: ITransaction = {
                id: entry.expense_id,
                label: "Outcome",
                title: entry.expense_name,
                imageUrl: entry.expense_thumbnail,
                note: entry.expense_information,
                price: entry.expense_amount,
                time: new Date(entry.transaction_time),
                isAffectingBalance: entry.is_affecting,
                prevTransactionAmount: entry.amount
            }
            transactions.push(transaction)
        });
      setOutcomeTransactions(transactions)
  }
  const fetchBalance = async () => {
    const res = await axios.post('/api/query',{
        queryString:`SELECT * FROM BALANCE WHERE user_id ='${user?.userId}' ORDER BY balance_id DESC;`
    })
    const updatedBalanceHistory : ITransaction[] = [] 
    const rows = res.data.result.rows
    rows.forEach((data:any, index:number)=>{
        const newBalance : ITransaction =
            {
                id: data.balance_id,
                label: "Balance",
                prevTransactionAmount: index == rows.length - 1? "0": rows[index+1].amount,
                title: "Update Saldo Manual" ,
                imageUrl: "",
                note: "Pengguna melakukan update saldo secara manual tanpa mempertimbangkan transaksi yang sudah ada sebelumnya",
                price: data.amount,
                time: new Date(data.transaction_time),
                isRelatedToTransaction: data.related_update
            }
        updatedBalanceHistory.push(newBalance)
    })
    setBalanceTransactions(updatedBalanceHistory)
    console.log(updatedBalanceHistory)
  }


  const value: IProductContext = {
    incomeTransactions,
    outcomeTransactions,
    balanceTransactions,
    clearAll,
    fetchDatabase
  };

  useEffect(() => {

    fetchDatabase();
  }, [user]);


  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};


export const useProductContext = () : IProductContext=> {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
