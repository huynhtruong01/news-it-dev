import { IHashTag } from '@/models'
import { theme } from '@/utils'
import { Box, Paper, Typography, alpha } from '@mui/material'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { COLOR_WHITE } from '@/consts'

export interface IDashboardTagProps {
    tag: IHashTag
}

export function DashboardTag({ tag }: IDashboardTagProps) {
    const color = useMemo(() => {
        return tag.color === COLOR_WHITE ? theme.palette.primary.dark : tag.color
    }, [tag])

    return (
        <Box
            component={Paper}
            elevation={1}
            borderRadius={theme.spacing(0.75)}
            borderTop={`10px solid ${color}`}
        >
            <Box padding={theme.spacing(2, 3, 3)}>
                <Typography
                    component="h3"
                    fontSize={'18px'}
                    marginBottom={2}
                    sx={{
                        span: {
                            color,
                        },
                        a: {
                            fontWeight: 600,
                            padding: theme.spacing(0.75, 1),
                            borderRadius: theme.spacing(0.65),
                            color: alpha(theme.palette.secondary.main, 0.9),
                            transition: '.2s ease-in-out',
                            '&:hover': {
                                boxShadow: `0 0 0 1px ${color}`,
                                backgroundColor: alpha(color as string, 0.1),
                                color: theme.palette.secondary.main,
                            },
                        },
                    }}
                >
                    {/* WRITE LINK HERE */}
                    <Link to={`/tags/${tag.name}`}>
                        <span>#</span>
                        {tag.name}
                    </Link>
                </Typography>
                <Typography
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        color: theme.palette.grey[700],
                    }}
                >
                    {tag.description}
                </Typography>
            </Box>
        </Box>
    )
}
