import { Box, Paper, Typography } from '@mui/material'
import { ForgotPasswordForm } from '@/components/Forms'
import { IForgotPassword } from '@/models'
import { theme } from '@/utils'
import { useTranslation } from 'react-i18next'
import { authApi } from '@/api'
import { useParams } from 'react-router-dom'

export function ForgotPassword() {
    const { t } = useTranslation()
    const params = useParams()

    const handleSetPassword = async (values: IForgotPassword) => {
        try {
            if (!params.token) return
            const token = decodeURIComponent(params.token as string)
                .split('_')
                .join('.')

            await authApi.forgotPassword(values, token)
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
                marginTop={3}
            >
                <Typography
                    component="h1"
                    variant="h5"
                    textAlign="center"
                    fontWeight={700}
                    marginBottom={3}
                >
                    {t('button.change_your_password')}
                </Typography>
                <Box>
                    <ForgotPasswordForm onSetPassword={handleSetPassword} />
                </Box>
            </Box>
        </Box>
    )
}
