import { InputField, PasswordField } from '@/components/FormFields'
import { ISignupValues } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { initSignupValues } from '@data/index'
import { enqueueSnackbar } from 'notistack'
import LoadingButton from '@mui/lab/LoadingButton'
import { theme } from '@/utils'

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
                <InputField<ISignupValues>
                    form={form}
                    label="Username"
                    name="username"
                    disabled={isSubmitting}
                    placeholder={'john.doe'}
                />
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                    }}
                >
                    <InputField
                        form={form}
                        label="First Name"
                        name="firstName"
                        disabled={isSubmitting}
                        placeholder={'Doe'}
                    />
                    <InputField
                        form={form}
                        label="Last Name"
                        name="lastName"
                        disabled={isSubmitting}
                        placeholder={'John'}
                    />
                </Box>
                <InputField
                    form={form}
                    label="Email"
                    name="emailAddress"
                    disabled={isSubmitting}
                    placeholder={'john.doe@example.com'}
                />
                <PasswordField
                    form={form}
                    label="Password"
                    name="password"
                    disabled={isSubmitting}
                />
                <PasswordField
                    form={form}
                    label="Confirm Password"
                    name="confirmPassword"
                    disabled={isSubmitting}
                />
            </Box>
            <LoadingButton
                type="submit"
                fullWidth
                loading={isSubmitting}
                loadingIndicator={
                    <CircularProgress
                        color="inherit"
                        size={16}
                        sx={{ paddingLeft: '5px', paddingRight: '5px' }}
                    />
                }
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
                Sign up
            </LoadingButton>
        </Box>
    )
}
