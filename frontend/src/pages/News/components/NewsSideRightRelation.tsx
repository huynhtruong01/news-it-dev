import { newsList } from '@/data'
import { theme } from '@/utils'
import { Box, BoxProps, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export interface INewsSideRightRelationProps extends BoxProps {
    hashTagIds: number[]
}

export function NewsSideRightRelation({
    hashTagIds,
    ...rest
}: INewsSideRightRelationProps) {
    // TODO: CREATE STATE SAVE NEWS LIST
    // TODO: FETCH NEWS BY HASH TAGS IDS FOR RELATIONS

    return (
        <Box {...rest} component={Paper} borderRadius={theme.spacing(0.75)}>
            <Typography
                component="h3"
                variant="h6"
                fontWeight={700}
                padding={theme.spacing(1.5, 2)}
                sx={{
                    a: {
                        color: theme.palette.primary.main,
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    },
                }}
            >
                Read next
            </Typography>

            <Stack component="ul">
                {newsList.map((news, index) => (
                    <Box key={news.id} component="li" padding={theme.spacing(2, 2, 0)}>
                        <Box paddingBottom={2}>
                            <Box
                                sx={{
                                    marginBottom: 1.5,
                                    img: {
                                        borderRadius: theme.spacing(0.75),
                                        overflow: 'hidden',
                                    },
                                }}
                            >
                                {/* TODO: WRITE LINK HERE */}
                                <Link to={'/'}>
                                    <img src={news.coverImage} alt={news.title} />
                                </Link>
                            </Box>
                            <Box>
                                <Typography
                                    component="h4"
                                    variant="h5"
                                    color={theme.palette.primary.light}
                                    fontWeight={700}
                                    sx={{
                                        a: {
                                            textDecoration: 'underline',
                                            '&:hover': {
                                                color: theme.palette.primary.dark,
                                            },
                                        },
                                    }}
                                >
                                    {/* TODO: WRITE LINK HERE */}
                                    <Link to={'/'}>{news.title}</Link>
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        marginTop: 0.75,
                                        marginBottom: 2.5,
                                        color: theme.palette.secondary.light,
                                    }}
                                >
                                    {news.sapo}
                                </Typography>
                                <Box
                                    display={'inline-block'}
                                    sx={{
                                        a: {
                                            color: theme.palette.primary.light,
                                            fontWeight: 600,
                                            textDecoration: 'underline',
                                            '&:hover': {
                                                color: theme.palette.primary.dark,
                                            },
                                        },
                                    }}
                                >
                                    {/* TODO: WRITE LINK HERE */}
                                    <Link to={'/'}>Read full news</Link>
                                </Box>
                            </Box>
                        </Box>
                        {index < newsList.length - 1 && <Divider />}
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}
