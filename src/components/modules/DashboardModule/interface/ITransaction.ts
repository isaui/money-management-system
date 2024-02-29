export interface ITransaction{
    id: string
    label: 'Income'|'Outcome'|'Balance'
    title: string
    imageUrl: string
    note: string
    price: string
    time: Date
    isAffectingBalance?: boolean
    isRelatedToTransaction?: boolean
    prevTransactionAmount?: string
}