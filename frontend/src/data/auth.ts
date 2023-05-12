import { ISignupValues, ILoginValues } from '@models/index'

export const initSignupValues: ISignupValues = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export const initLoginValues: ILoginValues = {
    email: '',
    password: '',
    rememberMe: false,
}
