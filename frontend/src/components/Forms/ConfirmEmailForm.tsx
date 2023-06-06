import { Box } from '@mui/material'
import { InputField } from '@/components/FormFields'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { enqueueSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { theme } from '@/utils'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
    emailAddress: yup.string().required('Please enter email').email('Invalid email'),
})

export interface IConfirmEmailFormProps {
    onConfirmPassword: (data: { emailAddress: string }) => Promise<void>
}

export function ConfirmEmailForm({ onConfirmPassword }: IConfirmEmailFormProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const form = useForm<{ emailAddress: string }>({
        defaultValues: {
            emailAddress: '',
        },
        resolver: yupResolver(schema),
    })

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = form

    const handleConfirmEmail = async (values: { emailAddress: string }) => {
        try {
            await onConfirmPassword(values)
            reset()
            navigate('/confirm-email-message')
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleConfirmEmail)}>
            <Box marginBottom={3}>
                <InputField
                    form={form}
                    label={t('input.email')}
                    name="emailAddress"
                    placeholder={'john.doe@example.com'}
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
                {t('button.send')}
            </LoadingButton>
        </Box>
    )
}
