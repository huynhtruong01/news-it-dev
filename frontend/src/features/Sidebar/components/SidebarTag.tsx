import { tags } from '@/data'
import { theme } from '@/utils'
import { Box, IconButton, Stack, Typography, alpha } from '@mui/material'
import { Link } from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

export function SidebarTag() {
    // TODO: FETCH ALL TAG WITH MOST FOLLOW

    return (
        <Box>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Typography component="h3" variant="subtitle1" fontWeight={700}>
                    Popular Tags
                </Typography>
                <Link to={'/tags'}>
                    <IconButton
                        sx={{
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.dark, 0.1),
                                svg: {
                                    color: theme.palette.primary.dark,
                                },
                            },
                        }}
                    >
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Link>
            </Stack>
            <Box
                component="ul"
                sx={{
                    maxHeight: '42vh',
                    overflow: 'auto',
                    marginTop: 2,
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
                        {/* TODO: WRITE LINK HERE */}
                        <Link to={`/tags/${tag.name}`}># {tag.name}</Link>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
