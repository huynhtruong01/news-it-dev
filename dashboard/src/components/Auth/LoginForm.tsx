import { Box, Button } from '@mui/material'
import { InputField, PasswordField } from '../FormFields'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ILoginValues } from '../../models'
import { useToast } from '../../hooks'

export interface ILoginFormProps {
    onLoginSubmit: (values: ILoginValues) => Promise<void>
}

const schema = yup.object().shape({
    emailAddress: yup.string().required('Please enter email.').email('Invalid email'),
    password: yup
        .string()
        .required('Please enter password.')
        .min(6, 'Enter password at least six characters.'),
})

export function LoginForm({ onLoginSubmit }: ILoginFormProps) {
    const { toastError } = useToast()
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
            toastError((error as Error).message)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <Box
                sx={{
                    marginBottom: 2,
                }}
            >
                <InputField<ILoginValues>
                    form={form}
                    label="Email"
                    name="emailAddress"
                    disabled={isSubmitting}
                    placeholder={'Enter email'}
                />
                <PasswordField<ILoginValues>
                    form={form}
                    label="Password"
                    name="password"
                    disabled={isSubmitting}
                />
            </Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{
                    padding: 1.5,
                }}
            >
                Login
            </Button>
        </Box>
    )
}
