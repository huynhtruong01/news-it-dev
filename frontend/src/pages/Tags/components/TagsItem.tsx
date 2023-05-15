import { IHashTag } from '@/models'
import { theme } from '@/utils'
import { Box, Button, Paper, Typography, alpha } from '@mui/material'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

export interface ITagsItemProps {
    tag: IHashTag
}

export function TagsItem({ tag }: ITagsItemProps) {
    const color = useMemo(() => {
        return tag.color === '#ffffff' ? theme.palette.primary.dark : tag.color
    }, [tag])

    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                borderTop: `1rem solid ${color}`,
                borderRadius: theme.spacing(0.75),
            }}
        >
            <Box
                sx={{
                    padding: 3,
                }}
            >
                <Typography
                    component="h3"
                    fontSize={'19px'}
                    marginBottom={2}
                    sx={{
                        marginLeft: -1,
                        span: {
                            color: color,
                        },
                        a: {
                            fontWeight: 600,
                            padding: theme.spacing(1, 1.25),
                            borderRadius: theme.spacing(0.75),
                            transition: '.2s ease-in-out',
                            '&:hover': {
                                boxShadow: `0 0 0 1px ${color}`,
                                backgroundColor: alpha(color as string, 0.1),
                            },
                        },
                    }}
                >
                    {/* TODO: WRITE LINK HERE */}
                    <Link to={`/tags/${tag.slug}`}>
                        <span>#</span>
                        {tag.name}
                    </Link>
                </Typography>
                <Typography marginBottom={1.5}>{tag.description}</Typography>
                <Typography
                    sx={{
                        marginBottom: 2,
                        fontSize: theme.typography.body2,
                    }}
                >
                    {tag.news?.length || 0} news published
                </Typography>
                {/* TODO: CHECK FOLLOW & FOLLOWING */}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'transparent',
                        border: `2px solid ${theme.palette.grey[500]}`,
                        borderRadius: theme.spacing(0.75),
                        color: theme.palette.secondary.main,
                        padding: theme.spacing(0.75, 1.75),
                        fontSize: theme.typography.body1,
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.grey[700], 0.05),
                            borderColor: theme.palette.grey[700],
                        },
                    }}
                >
                    Follow
                </Button>
            </Box>
        </Box>
    )
}
