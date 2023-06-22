import { ButtonLoadingForm } from '@/components/Common'
import { InputField } from '@/components/FormFields'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const schema = yup.object().shape({
    emailAddress: yup.string().required('Please enter email').email('Invalid email'),
})

export interface IResetField {
    emailAddress: string
}

export interface IConfirmEmailFormProps {
    onConfirmPassword: (data: { emailAddress: string }) => Promise<void>
}

export function ConfirmEmailForm({ onConfirmPassword }: IConfirmEmailFormProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const form = useForm<IResetField>({
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

    const handleConfirmEmail = async (values: IResetField) => {
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
                <InputField<IResetField>
                    form={form}
                    label={t('input.email')}
                    name="emailAddress"
                    placeholder={'john.doe@example.com'}
                    disabled={isSubmitting}
                    required
                />
            </Box>
            <ButtonLoadingForm loading={isSubmitting} text={t('button.send')} />
        </Box>
    )
}
