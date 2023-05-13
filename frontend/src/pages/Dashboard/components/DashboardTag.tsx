import { IHashTag } from '@/models'
import { theme } from '@/utils'
import { Box, Paper, Typography, alpha } from '@mui/material'
import { Link } from 'react-router-dom'

export interface IDashboardTagProps {
    tag: IHashTag
}

export function DashboardTag({ tag }: IDashboardTagProps) {
    return (
        <Box
            component={Paper}
            elevation={1}
            borderRadius={theme.spacing(0.75)}
            borderTop={`10px solid ${tag.color}`}
        >
            <Box padding={theme.spacing(2, 3, 3)}>
                <Typography
                    component="h3"
                    fontSize={'18px'}
                    marginBottom={2}
                    sx={{
                        span: {
                            color: tag.color,
                        },
                        a: {
                            fontWeight: 600,
                            padding: theme.spacing(1, 1.25),
                            borderRadius: theme.spacing(0.75),
                            transition: '.2s ease-in-out',
                            '&:hover': {
                                boxShadow: `0 0 0 1px ${tag.color}`,
                                backgroundColor: alpha(tag.color as string, 0.1),
                            },
                        },
                    }}
                >
                    {/* TODO: WRITE LINK HERE */}
                    <Link to={'/'}>
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
