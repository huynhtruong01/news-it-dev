import { theme } from '@/utils'
import { Box, Button, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function SidebarHeader() {
    const { t } = useTranslation()

    return (
        <Paper
            elevation={1}
            sx={{
                backgroundColor: theme.palette.primary.contrastText,
                padding: theme.spacing(2),
            }}
        >
            <Typography component="h2" variant="h6" fontWeight={700} marginBottom={1}>
                {t('message.welcome_2')}
            </Typography>
            <Typography color={theme.palette.grey[700]} marginBottom={2} fontWeight={400}>
                {t('message.sidebar_header_desc')}
            </Typography>
            <Box
                sx={{
                    button: {
                        display: 'block',
                        padding: 0,
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        borderRadius: theme.spacing(0.75),
                        fontWeight: 400,

                        '&:hover': {
                            boxShadow: 'none',
                            '& a': {
                                textDecoration: 'underline',
                            },
                        },

                        a: {
                            display: 'block',
                            fontSize: '1rem',
                            padding: theme.spacing(1.25),
                        },
                    },
                }}
            >
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        marginBottom: 0.75,
                        border: `2px solid ${theme.palette.primary.main}`,

                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                            '& a': {
                                color: theme.palette.primary.contrastText,
                            },
                        },

                        a: {
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    <Link to={'/signup'}>{t('auth.create_account')}</Link>
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        color: theme.palette.secondary.main,
                        '&:hover': {
                            backgroundColor: '#3b49df1a',

                            '& a': {
                                color: theme.palette.primary.main,
                            },
                        },

                        a: {
                            color: theme.palette.secondary.main,
                        },
                    }}
                >
                    <Link to={'/login'}>{t('auth.login')}</Link>
                </Button>
            </Box>
        </Paper>
    )
}
