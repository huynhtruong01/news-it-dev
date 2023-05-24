import { ISignupValues, ILoginValues } from '@models/index'

export const initSignupValues: ISignupValues = {
    firstName: '',
    lastName: '',
    username: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
}

export const initLoginValues: ILoginValues = {
    emailAddress: '',
    password: '',
    rememberMe: false,
}
