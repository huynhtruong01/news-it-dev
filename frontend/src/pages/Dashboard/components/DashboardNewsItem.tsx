import { INews } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Paper, Stack, Typography } from '@mui/material'
import { green, red, yellow } from '@mui/material/colors'
import { Link } from 'react-router-dom'

export interface IDashboardNewsItemProps extends BoxProps {
    news: INews
}

export function DashboardNewsItem({ news, ...rest }: IDashboardNewsItemProps) {
    // TODO: DELETE NEWS

    // TODO: UPDATE NEWS

    return (
        <Box component={Paper} elevation={1} {...rest}>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                    padding: 2,
                }}
            >
                <Typography
                    component="h3"
                    fontWeight={700}
                    fontSize={'19px'}
                    sx={{
                        color: theme.palette.primary.light,
                        '&:hover': {
                            color: theme.palette.primary.dark,
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {/* TODO: WRITE LINK HERE */}
                    <Link to={'/'}>{news.title}</Link>
                </Typography>
                <Typography
                    component="span"
                    sx={{
                        display: 'inline-block',
                        textTransform: 'capitalize',
                        padding: 0.5,
                        backgroundColor: yellow[700],
                        borderRadius: 1.5,
                        fontSize: theme.typography.body2,
                        color: '#78350f',
                        lineHeight: 1.25,
                        textAlign: 'center',
                    }}
                >
                    {news.status}
                </Typography>
                <Stack
                    direction={'row'}
                    gap={1}
                    sx={{
                        div: {
                            fontSize: theme.typography.body2,
                            padding: theme.spacing(0.5, 1.5),
                            borderRadius: theme.spacing(0.75),
                            cursor: 'pointer',
                            transition: '.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: theme.palette.grey[200],
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            color: red[700],
                        }}
                    >
                        Delete
                    </Box>
                    <Box
                        sx={{
                            color: green[700],
                        }}
                    >
                        Edit
                    </Box>
                </Stack>
            </Stack>
        </Box>
    )
}
