export interface ITransaction{
    label: 'Income'|'Outcome'|'Balance'
    title: string
    imageUrl: string
    note: string
    price: string
    time: Date
    isAffectingBalance?: boolean
}