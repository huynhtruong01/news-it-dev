import { theme } from '../../utils'
import WestIcon from '@mui/icons-material/West'
import { Box, BoxProps, Paper, Stack, Typography, alpha } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
export type INotFoundProps = BoxProps

export function NotFound({ ...rest }: BoxProps) {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <Box paddingTop={15} {...rest}>
            <Box margin="auto">
                <Box></Box>
                <Stack
                    alignItems={'center'}
                    component={Paper}
                    elevation={1}
                    width={500}
                    sx={{
                        padding: theme.spacing(6, 2),
                        margin: 'auto',
                    }}
                >
                    <Stack
                        sx={{
                            'h1, h6, p': {
                                textAlign: 'center',
                            },
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h1"
                            sx={{
                                color: alpha(theme.palette.secondary.main, 0.8),
                                fontWeight: 800,
                                textShadow: `0px -4px 8px ${theme.palette.primary.light}`,
                            }}
                        >
                            404
                        </Typography>
                        <Typography
                            component={'h6'}
                            variant="h6"
                            sx={{
                                color: theme.palette.secondary.main,
                                fontWeight: 700,
                            }}
                        >
                            Page not found
                        </Typography>
                        <Typography marginTop={3} color={theme.palette.secondary.main}>
                            The link{' '}
                            <Typography
                                component="span"
                                color={theme.palette.primary.main}
                                fontWeight={500}
                                sx={{
                                    textDecoration: 'underline',
                                }}
                            >
                                {location.pathname}
                            </Typography>{' '}
                            you clicked may be broken of the page <br />
                            may have been removed or renamed
                        </Typography>
                    </Stack>
                    <Stack
                        direction={'row'}
                        gap={1.5}
                        marginTop={5}
                        sx={{
                            padding: theme.spacing(1, 2),
                            display: 'inline-flex',
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.contrastText,
                            cursor: 'pointer',
                            borderRadius: theme.spacing(0.75),
                            transition: '.2s ease-in-out',
                            svg: {
                                transition: '.2s ease-in-out',
                            },
                            '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                svg: {
                                    transform: 'translateX(-4px)',
                                },
                            },
                        }}
                        onClick={() => navigate(-1)}
                    >
                        <WestIcon />
                        <Typography component="span" fontWeight={500}>
                            Back
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}
