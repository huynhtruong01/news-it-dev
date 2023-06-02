import { InputField, PasswordField, CheckBoxField } from '@/components/FormFields'
import { ILoginValues } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { initLoginValues } from '@/data'
import { enqueueSnackbar } from 'notistack'
import LoadingButton from '@mui/lab/LoadingButton'
import { theme } from '@/utils'
import { useTranslation } from 'react-i18next'

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
            enqueueSnackbar(error.message, {
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
                <InputField
                    form={form}
                    label={t('input.email')}
                    name="emailAddress"
                    disabled={isSubmitting}
                    placeholder={'john.doe@example.com'}
                />
                <PasswordField
                    form={form}
                    label={t('input.password')}
                    name="password"
                    disabled={isSubmitting}
                />
                <CheckBoxField
                    form={form}
                    label={t('input.remember_me')}
                    name="rememberMe"
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
                {t('auth.login')}
            </LoadingButton>
        </Box>
    )
}
