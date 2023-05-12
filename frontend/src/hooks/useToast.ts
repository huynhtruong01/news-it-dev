import { toast, ToastContainerProps } from 'react-toastify'

export const useToast = () => {
    const toastSuccess = (message: string, options: ToastContainerProps = {}) =>
        toast.success(message, options)

    const toastError = (message: string, options: ToastContainerProps = {}) =>
        toast.error(message, options)

    return {
        toastSuccess,
        toastError,
    }
}
