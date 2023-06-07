import { Box, Button } from '@mui/material'
import { InputField, PasswordField } from '../FormFields'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ISignupValues } from '../../models'

export interface ISignupFormProps {
    onSignupSubmit: (values: ISignupValues) => Promise<void>
}

const schema = yup.object().shape({
    username: yup.string().required('Please enter username.'),
    firstName: yup.string().required('Please enter first name.'),
    lastName: yup.string().required('Please enter last name.'),
    emailAddress: yup.string().required('Please enter email.').email('Invalid email'),
    password: yup
        .string()
        .required('Please enter password.')
        .min(6, 'Enter password at least six characters.'),
    confirmPassword: yup
        .string()
        .required('Please enter confirm password.')
        .min(6, 'Enter password at least six characters.')
        .oneOf([yup.ref('password')], 'Confirm password is not match.'),
})

export function SignupForm({ onSignupSubmit }: ISignupFormProps) {
    const form = useForm<ISignupValues>({
        defaultValues: {
            username: '',
            lastName: '',
            firstName: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',
        },
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
            throw new Error(error as string)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <Box
                sx={{
                    marginBottom: 3,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                    }}
                >
                    <InputField<ISignupValues>
                        form={form}
                        label="First Name"
                        name="firstName"
                        disabled={isSubmitting}
                        placeholder={'Enter first name'}
                    />
                    <InputField<ISignupValues>
                        form={form}
                        label="Last Name"
                        name="lastName"
                        disabled={isSubmitting}
                        placeholder={'Enter last name'}
                    />
                </Box>
                <InputField<ISignupValues>
                    form={form}
                    label="Username"
                    name="username"
                    disabled={isSubmitting}
                    placeholder={'Enter username'}
                />
                <InputField<ISignupValues>
                    form={form}
                    label="Email"
                    name="emailAddress"
                    disabled={isSubmitting}
                    placeholder={'Enter email'}
                />

                <PasswordField<ISignupValues>
                    form={form}
                    label="Password"
                    name="password"
                    disabled={isSubmitting}
                />
                <PasswordField<ISignupValues>
                    form={form}
                    label="Confirm Password"
                    name="confirmPassword"
                    disabled={isSubmitting}
                />
            </Box>
            <Button type="submit" fullWidth variant="contained">
                Signup
            </Button>
        </Box>
    )
}
