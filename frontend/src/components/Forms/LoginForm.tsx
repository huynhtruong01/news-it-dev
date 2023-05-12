import { InputField, PasswordField, CheckBoxField } from '@components/formFields'
import { useToast } from '@/hooks'
import { ILoginValues } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { initLoginValues } from '@data'

export interface ILoginFormProps {
    onLoginSubmit: (values: ILoginValues) => Promise<void>
}

const schema = yup.object().shape({
    email: yup.string().required('Please enter email.').email('Invalid email'),
    password: yup
        .string()
        .required('Please enter password.')
        .min(6, 'Enter password at least six characters.'),
    rememberMe: yup.boolean(),
})

export function LoginForm({ onLoginSubmit }: ILoginFormProps) {
    const { toastError } = useToast()
    const form = useForm<ILoginValues>({
        defaultValues: initLoginValues,
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
                <CheckBoxField
                    form={form}
                    label="Remember me"
                    name="rememberMe"
                    disabled={isSubmitting}
                />
            </Box>
            <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
                Login
            </Button>
        </Box>
    )
}
