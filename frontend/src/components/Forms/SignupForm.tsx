import { InputField, PasswordField } from '@/components/FormFields'
import { ISignupValues } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { initSignupValues } from '@/data'
import { enqueueSnackbar } from 'notistack'
import LoadingButton from '@mui/lab/LoadingButton'
import { theme } from '@/utils'
import { useTranslation } from 'react-i18next'

export interface ISignupFormProps {
    onSignupSubmit: (values: ISignupValues) => Promise<void>
}

const schema = yup.object().shape({
    firstName: yup.string().required('Please enter first name.'),
    lastName: yup.string().required('Please enter last name.'),
    username: yup.string().required('Please enter username.'),
    emailAddress: yup.string().required('Please enter email.').email('Invalid email'),
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
    const { t } = useTranslation()

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
                <InputField<ISignupValues>
                    form={form}
                    label={t('input.username')}
                    name="username"
                    disabled={isSubmitting}
                    placeholder={'john.doe'}
                />
                <Stack
                    direction={'row'}
                    gap={{
                        md: 2,
                        xs: 1,
                    }}
                >
                    <InputField<ISignupValues>
                        form={form}
                        label={t('input.first_name')}
                        name="firstName"
                        disabled={isSubmitting}
                        placeholder={'Doe'}
                    />
                    <InputField<ISignupValues>
                        form={form}
                        label={t('input.last_name')}
                        name="lastName"
                        disabled={isSubmitting}
                        placeholder={'John'}
                    />
                </Stack>
                <InputField<ISignupValues>
                    form={form}
                    label={t('input.email')}
                    name="emailAddress"
                    disabled={isSubmitting}
                    placeholder={'john.doe@example.com'}
                />
                <PasswordField<ISignupValues>
                    form={form}
                    label={t('input.password')}
                    name="password"
                    disabled={isSubmitting}
                />
                <PasswordField<ISignupValues>
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
                {t('auth.sign_up')}
            </LoadingButton>
        </Box>
    )
}
