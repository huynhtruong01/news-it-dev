export interface ILoginValues {
    emailAddress: string
    password: string
    rememberMe: boolean
}

export interface ISignupValues {
    username: string
    lastName: string
    firstName: string
    emailAddress: string
    password: string
    confirmPassword: string
}

export interface IFacebookLoginParams {
    accessToken: string
    userId: string
}

export interface IResetPassword {
    emailAddress: string
    password: string
    confirmPassword: string
}

export interface IForgotPassword {
    password: string
    confirmPassword: string
}
