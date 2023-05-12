// export interface ISidebarTagProps {}

import { tags } from '@/data'
import { theme } from '@/utils'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export function SidebarTag() {
    return (
        <Box>
            <Typography component="h3" variant="subtitle1" fontWeight={700}>
                Popular Tags
            </Typography>
            <Box
                component="ul"
                sx={{
                    maxHeight: '42vh',
                    overflow: 'auto',
                }}
            >
                {tags.map((tag) => (
                    <Box
                        component="li"
                        key={tag.value}
                        sx={{
                            padding: theme.spacing(1, 2),
                            borderRadius: theme.spacing(0.75),
                            cursor: 'pointer',

                            '&:hover': {
                                backgroundColor: '#3b49df1a',
                                a: {
                                    color: theme.palette.primary.main,
                                    textDecoration: 'underline',
                                },
                            },

                            a: {
                                display: 'block',
                            },
                        }}
                    >
                        <Link to={'/'}># {tag.name}</Link>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
