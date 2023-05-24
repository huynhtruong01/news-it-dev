import { SocialLogin } from '@/pages/Auth/components'
import { Box, Container, Paper, Typography } from '@mui/material'
import { theme } from '@utils/index'
import { ReactNode, useEffect } from 'react'

export interface IAuthContainerProps {
    children: ReactNode
}

export function AuthContainer({ children }: IAuthContainerProps) {
    useEffect(() => {
        document.title = 'Welcome! - Dev Community'
    }, [])

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
            }}
        >
            <Container>
                <Paper
                    elevation={2}
                    sx={{
                        width: 640,
                        margin: 'auto',
                        padding: theme.spacing(6),
                    }}
                >
                    <Box marginBottom={3}>
                        <Typography
                            component="h1"
                            variant="h4"
                            textAlign="center"
                            fontWeight={700}
                        >
                            Welcome to DEV Community
                        </Typography>
                        <Typography
                            textAlign="center"
                            color={theme.palette.secondary.main}
                        >
                            DEV Community is a community of 1,061,194 amazing developers
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginBottom: theme.spacing(2),
                        }}
                    >
                        <SocialLogin />
                    </Box>
                    {children}
                </Paper>
            </Container>
        </Box>
    )
}
