import { ButtonLoadingForm } from '@/components/Common'
import { InputField, PasswordField } from '@/components/FormFields'
import { initLoginValues } from '@/data'
import { ILoginValues } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

export interface ILoginFormProps {
    onLoginSubmit: (values: ILoginValues) => Promise<void>
}

const schema = yup.object().shape({
    emailAddress: yup.string().required('Please enter email.').email('Invalid email'),
    password: yup
        .string()
        .required('Please enter password.')
        .min(6, 'Enter password at least six characters.'),
    rememberMe: yup.boolean(),
})

export function LoginForm({ onLoginSubmit }: ILoginFormProps) {
    const { t } = useTranslation()

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
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <Box
                sx={{
                    marginBottom: 3,
                }}
            >
                <InputField<ILoginValues>
                    form={form}
                    label={t('input.email')}
                    name="emailAddress"
                    disabled={isSubmitting}
                    placeholder={'john.doe@example.com'}
                    required
                />
                <PasswordField<ILoginValues>
                    form={form}
                    label={t('input.password')}
                    name="password"
                    disabled={isSubmitting}
                    required
                />
            </Box>
            <ButtonLoadingForm loading={isSubmitting} text={t('auth.login')} />
        </Box>
    )
}
