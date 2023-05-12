import { InputField, PasswordField } from '@components/formFields/index'
import { useToast } from '@/hooks'
import { ISignupValues } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { initSignupValues } from '@data/index'

export interface ISignupFormProps {
    onSignupSubmit: (values: ISignupValues) => Promise<void>
}

const schema = yup.object().shape({
    firstName: yup.string().required('Please enter first name.'),
    lastName: yup.string().required('Please enter last name.'),
    username: yup.string().required('Please enter username.'),
    email: yup.string().required('Please enter email.').email('Invalid email'),
    password: yup
        .string()
        .required('Please enter password.')
        .min(6, 'Enter password at least six characters.'),
    confirmPassword: yup
        .string()
        .required('Please enter confirm password.')
        .min(6, 'Enter password at least six characters.')
        .oneOf([yup.ref('password')], "Don't match password."),
})

export function SignupForm({ onSignupSubmit }: ISignupFormProps) {
    const { toastError } = useToast()
    const form = useForm<ISignupValues>({
        defaultValues: initSignupValues,
        resolver: yupResolver(schema),
    })

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = form

    const handleLoginSubmit = async (values: ISignupValues) => {
        try {
            await onSignupSubmit(values)
            reset()
        } catch (error) {
            toastError((error as Error).message)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <Box
                sx={{
                    marginBottom: 3,
                }}
            >
                <InputField<ISignupValues>
                    form={form}
                    label="Username"
                    name="username"
                    disabled={isSubmitting}
                    placeholder={'Enter username'}
                />
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                    }}
                >
                    <InputField
                        form={form}
                        label="First Name"
                        name="firstName"
                        disabled={isSubmitting}
                        placeholder={'Enter first name'}
                    />
                    <InputField
                        form={form}
                        label="Last Name"
                        name="lastName"
                        disabled={isSubmitting}
                        placeholder={'Enter last name'}
                    />
                </Box>
                <InputField
                    form={form}
                    label="Email"
                    name="email"
                    disabled={isSubmitting}
                    placeholder={'Enter email'}
                />
                <PasswordField
                    form={form}
                    label="Password"
                    name="password"
                    disabled={isSubmitting}
                />
                <PasswordField
                    form={form}
                    label="Confirm Password"
                    name="confirmPassword"
                    disabled={isSubmitting}
                />
            </Box>
            <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
                Sign up
            </Button>
        </Box>
    )
}
