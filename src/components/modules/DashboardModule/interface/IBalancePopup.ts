export interface IBalancePopup{
    onCancel: () => void
    onSuccess: () => void
    title: string,
    currentBalance: string
}