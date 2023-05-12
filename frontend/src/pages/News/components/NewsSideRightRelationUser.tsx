import { HashTagList } from '@/components/Common'
import { IUser } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Paper, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export interface INewsSideRightRelationUserProps extends BoxProps {
    user: IUser | null
}

export function NewsSideRightRelationUser({
    user,
    ...rest
}: INewsSideRightRelationUserProps) {
    return (
        user && (
            <Box
                {...rest}
                component={Paper}
                elevation={1}
                borderRadius={theme.spacing(0.75)}
            >
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
                    More from <Link to={'/'}>{user.username}</Link>
                </Typography>

                <Stack component="ul" gap={2}>
                    {user.news?.map((newsItem) => (
                        <Box
                            key={newsItem.id}
                            component="li"
                            padding={theme.spacing(1.5, 2, 2)}
                            sx={{
                                '&:hover h6': {
                                    color: theme.palette.primary.main,
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            <Link to={'/'}>
                                <Typography
                                    component="h6"
                                    variant="body1"
                                    color={theme.palette.secondary.light}
                                >
                                    {newsItem.title}
                                </Typography>
                                <Box paddingTop={1.5}>
                                    <HashTagList
                                        tags={newsItem.hashTags || []}
                                        sx={{
                                            marginBottom: 0,
                                        }}
                                    />
                                </Box>
                            </Link>
                        </Box>
                    ))}
                </Stack>
            </Box>
        )
    )
}
