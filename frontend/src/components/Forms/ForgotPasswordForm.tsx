import { ButtonLoadingForm } from '@/components/Common'
import { PasswordField } from '@/components/FormFields'
import { IForgotPassword } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

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
                    required
                />
                <PasswordField<IForgotPassword>
                    form={form}
                    label={t('input.confirm_password')}
                    name="confirmPassword"
                    disabled={isSubmitting}
                    required
                />
            </Box>
            <ButtonLoadingForm
                loading={isSubmitting}
                text={t('button.change_your_password')}
            />
        </Box>
    )
}
