export interface IAuthPopup{
    isLoginDisplayInit: boolean
    onSubmit: () => void
    onFinish: () => void
    onCancel: () => void
}