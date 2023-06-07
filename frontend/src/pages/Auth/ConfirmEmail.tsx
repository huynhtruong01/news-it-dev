import { Box, Paper, Typography } from '@mui/material'
import { ConfirmEmailForm } from '@/components/Forms'
import { theme } from '@/utils'
import { useTranslation } from 'react-i18next'
import { authApi } from '@/api'

export function ConfirmEmail() {
    const { t } = useTranslation()

    const handleConfirmEmail = async (values: { emailAddress: string }) => {
        try {
            await authApi.confirmEmail(values.emailAddress)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    return (
        <Box>
            <Box
                component={Paper}
                width={{
                    md: 430,
                    xs: '100%',
                }}
                margin="auto"
                padding={theme.spacing(2.25, 4, 4)}
            >
                <Typography
                    component="h1"
                    variant="h5"
                    textAlign="center"
                    fontWeight={700}
                    marginBottom={3}
                >
                    {t('button.confirm_email')}
                </Typography>
                <Box>
                    <ConfirmEmailForm onConfirmPassword={handleConfirmEmail} />
                </Box>
            </Box>
        </Box>
    )
}
