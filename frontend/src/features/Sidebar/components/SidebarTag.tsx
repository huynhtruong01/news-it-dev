import { IHashTag } from '@/models'
import { AppState } from '@/store'
import { theme } from '@/utils'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, IconButton, Stack, Typography, alpha } from '@mui/material'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export interface ISidebarTagProps {
    pTags: IHashTag[]
}

function SidebarTag({ pTags }: ISidebarTagProps) {
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
                {pTags.map((tag) => (
                    <Box
                        component="li"
                        key={tag.id}
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

const mapStateToProps = (state: AppState) => {
    return {
        pTags: state.hashTag.hashTagsPopular || [],
    }
}

export default connect(mapStateToProps, null)(SidebarTag)
