import { Box } from '@mui/material'
import { InputField, PasswordField } from '@/components/FormFields'
import { yupResolver } from '@hookform/resolvers/yup'
import { IResetPassword } from '@/models'
import LoadingButton from '@mui/lab/LoadingButton'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { theme } from '@/utils'

export interface IForgotPasswordFormProps {
    onSetPassword: (data: IResetPassword) => Promise<void>
}

const schema = yup.object().shape({
    emailAddress: yup.string().required('Please enter email.').email('Invalid email'),
    password: yup
        .string()
        .required('Please enter new password.')
        .min(6, 'Please enter new password at least six characters.'),
    confirmPassword: yup
        .string()
        .required('Please enter confirm password.')
        .oneOf([yup.ref('password')], 'Confirm password not matched.')
        .min(6, 'Please enter confirm password at least six characters.'),
})

export function ForgotPasswordForm({ onSetPassword }: IForgotPasswordFormProps) {
    const navigate = useNavigate()

    const form = useForm<IResetPassword>({
        defaultValues: {
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

    const handleSetPassword = async (values: IResetPassword) => {
        try {
            await onSetPassword(values)

            reset()
            enqueueSnackbar('Change your password successfully', {
                variant: 'success',
            })
            navigate('/login')
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleSetPassword)}>
            <Box marginBottom={3}>
                <InputField
                    form={form}
                    label="Email"
                    name="emailAddress"
                    placeholder={'john.doe@example.com'}
                    disabled={isSubmitting}
                />
                <PasswordField
                    form={form}
                    label="Password"
                    name="password"
                    disabled={isSubmitting}
                />
                <PasswordField
                    form={form}
                    label="Confirm password"
                    name="Confirm password"
                    disabled={isSubmitting}
                />
            </Box>
            <LoadingButton
                type="submit"
                fullWidth
                loading={isSubmitting}
                loadingPosition="start"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                    backgroundColor: theme.palette.primary.light,
                    padding: theme.spacing(1.5),
                    fontWeight: 500,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }}
            >
                Change my password
            </LoadingButton>
        </Box>
    )
}
