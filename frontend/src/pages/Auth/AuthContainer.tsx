import { Box, Typography, Paper, Container } from '@mui/material'
import { theme } from '@utils/index'
import { ButtonIconForm } from '@components/common/index'
import GitHubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'
import { ReactNode, useEffect } from 'react'

export interface IAuthContainerProps {
    children: ReactNode
}

export function AuthContainer({ children }: IAuthContainerProps) {
    useEffect(() => {
        document.title = 'Welcome! - Dev Community'
    }, [])

    const handleGithubLogin = () => {
        console.log('login github')
    }

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
                        <ButtonIconForm
                            text={'Continue with Github'}
                            icon={GitHubIcon}
                            onButtonClick={handleGithubLogin}
                            sx={{
                                backgroundColor: theme.palette.secondary.dark,
                                color: theme.palette.primary.contrastText,
                                padding: theme.spacing(1.5),
                                margin: theme.spacing(0.5, 0),

                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.dark,
                                },
                            }}
                        />
                        <ButtonIconForm
                            text={'Continue with Google'}
                            icon={GoogleIcon}
                            onButtonClick={handleGithubLogin}
                            sx={{
                                backgroundColor: theme.palette.primary.contrastText,
                                color: theme.palette.secondary.dark,
                                padding: theme.spacing(1.5),
                                margin: theme.spacing(0.5, 0),

                                '&:hover': {
                                    backgroundColor: theme.palette.primary.contrastText,
                                },
                            }}
                        />
                    </Box>
                    {children}
                </Paper>
            </Container>
        </Box>
    )
}
