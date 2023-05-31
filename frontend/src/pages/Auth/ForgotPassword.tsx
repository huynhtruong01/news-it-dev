import { Box, Paper, Typography } from '@mui/material'
import { ForgotPasswordForm } from '@/components/Forms'
import { IResetPassword } from '@/models'
import { theme } from '@/utils'

export function ForgotPassword() {
    const handleSetPassword = async (values: IResetPassword) => {
        try {
            await authApi.forgotPassword(values)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    return (
        <Box>
            <Box
                component={Paper}
                width={430}
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
                    Change your password
                </Typography>
                <Box>
                    <ForgotPasswordForm onSetPassword={handleSetPassword} />
                </Box>
            </Box>
        </Box>
    )
}
