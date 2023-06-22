import { ButtonLoadingForm } from '@/components/Common'
import { InputField, PasswordField } from '@/components/FormFields'
import { initSignupValues } from '@/data'
import { ISignupValues } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Stack } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

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
                    required
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
                        required
                    />
                    <InputField<ISignupValues>
                        form={form}
                        label={t('input.last_name')}
                        name="lastName"
                        disabled={isSubmitting}
                        placeholder={'John'}
                        required
                    />
                </Stack>
                <InputField<ISignupValues>
                    form={form}
                    label={t('input.email')}
                    name="emailAddress"
                    disabled={isSubmitting}
                    placeholder={'john.doe@example.com'}
                    required
                />
                <PasswordField<ISignupValues>
                    form={form}
                    label={t('input.password')}
                    name="password"
                    disabled={isSubmitting}
                    required
                />
                <PasswordField<ISignupValues>
                    form={form}
                    label={t('input.confirm_password')}
                    name="confirmPassword"
                    disabled={isSubmitting}
                    required
                />
            </Box>
            <ButtonLoadingForm loading={isSubmitting} text={t('auth.sign_up')} />
        </Box>
    )
}
