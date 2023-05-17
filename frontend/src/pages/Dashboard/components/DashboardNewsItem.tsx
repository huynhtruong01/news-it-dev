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
            <Box
                sx={{
                    padding: 2,
                    display: 'grid',
                    gridTemplateColumns: '4fr 2fr 2fr',
                    gap: 2,
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    component="h3"
                    fontWeight={700}
                    fontSize={'19px'}
                    sx={{
                        color: theme.palette.primary.light,

                        a: {
                            display: 'inline',

                            '&:hover': {
                                color: theme.palette.primary.dark,
                                textDecoration: 'underline',
                            },
                        },
                    }}
                    noWrap
                >
                    {/* WRITE LINK HERE */}
                    <Link to={`/news/${news.slug}`}>{news.title}</Link>
                </Typography>
                <Stack alignItems={'center'}>
                    <Typography
                        component="span"
                        sx={{
                            textTransform: 'capitalize',
                            padding: 0.5,
                            backgroundColor: yellow[700],
                            borderRadius: 1.5,
                            fontSize: theme.typography.subtitle2,
                            color: '#78350f',
                            lineHeight: 1.25,
                            textAlign: 'center',
                            fontWeight: 400,
                        }}
                    >
                        {news.status}
                    </Typography>
                </Stack>
                <Stack
                    direction={'row'}
                    gap={1}
                    justifyContent={'flex-end'}
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
            </Box>
        </Box>
    )
}
