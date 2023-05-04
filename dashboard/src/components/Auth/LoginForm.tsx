import { Box, Button } from '@mui/material'
import { InputField, PasswordField } from '../FormFields'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ILoginValues } from '../../models'

export interface ILoginFormProps {
    onLoginSubmit: (values: ILoginValues) => Promise<void>
}

const schema = yup.object().shape({
    email: yup.string().required('Please enter email.').email('Invalid email'),
    password: yup
        .string()
        .required('Please enter password.')
        .min(6, 'Enter password at least six characters.'),
})

export function LoginForm({ onLoginSubmit }: ILoginFormProps) {
    const form = useForm<ILoginValues>({
        defaultValues: {
            emailAddress: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = form

    const handleLoginSubmit = async (values: ILoginValues) => {
        try {
            await onLoginSubmit(values)
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
            </Box>
            <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
                Login
            </Button>
        </Box>
    )
}
