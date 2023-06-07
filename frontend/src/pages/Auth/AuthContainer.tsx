import { SocialLogin } from '@/pages/Auth/components'
import { theme } from '@/utils'
import { Box, Paper, Typography, alpha } from '@mui/material'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export interface IAuthContainerProps {
    children: ReactNode
}

export function AuthContainer({ children }: IAuthContainerProps) {
    const { t } = useTranslation()

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
            }}
        >
            <Paper
                elevation={1}
                sx={{
                    width: {
                        md: 640,
                        xs: '100%',
                    },
                    margin: 'auto',
                    padding: {
                        md: 6,
                        xs: 2,
                    },
                }}
            >
                <Box marginBottom={3.5}>
                    <Typography
                        component="h1"
                        variant="h4"
                        textAlign="center"
                        fontWeight={700}
                    >
                        {t('message.welcome')}
                    </Typography>
                    <Typography
                        textAlign="center"
                        color={alpha(theme.palette.secondary.main, 0.8)}
                        marginTop={0.5}
                    >
                        {t('message.welcome_2')}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginBottom: theme.spacing(3),
                    }}
                >
                    <SocialLogin />
                </Box>
                {children}
            </Paper>
        </Box>
    )
}
