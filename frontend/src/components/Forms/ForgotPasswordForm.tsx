import { Box } from '@mui/material'
import { PasswordField } from '@/components/FormFields'
import { yupResolver } from '@hookform/resolvers/yup'
import { IForgotPassword } from '@/models'
import LoadingButton from '@mui/lab/LoadingButton'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { theme } from '@/utils'
import { useTranslation } from 'react-i18next'

export interface IForgotPasswordFormProps {
    onSetPassword: (data: IForgotPassword) => Promise<void>
}

const schema = yup.object().shape({
    password: yup
        .string()
        .required('Please enter new password')
        .min(6, 'Please enter new password at least six characters'),
    confirmPassword: yup
        .string()
        .required('Please enter confirm password')
        .oneOf([yup.ref('password')], 'Confirm password not matched')
        .min(6, 'Please enter confirm password at least six characters'),
})

export function ForgotPasswordForm({ onSetPassword }: IForgotPasswordFormProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const form = useForm<IForgotPassword>({
        defaultValues: {
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

    const handleSetPassword = async (values: IForgotPassword) => {
        try {
            await onSetPassword(values)

            reset()
            enqueueSnackbar(`${t('message.format_password_success')}`, {
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
                <PasswordField<IForgotPassword>
                    form={form}
                    label={t('input.password')}
                    name="password"
                    disabled={isSubmitting}
                />
                <PasswordField<IForgotPassword>
                    form={form}
                    label={t('input.confirm_password')}
                    name="confirmPassword"
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
                {t('button.change_your_password')}
            </LoadingButton>
        </Box>
    )
}
