import { IHashTag, IUser } from '@/models'
import { AppState } from '@/store'
import { theme } from '@/utils'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, IconButton, Stack, Typography, alpha } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export interface ISidebarTagProps {
    pTags: IHashTag[]
    pUser: IUser | null
}

function SidebarTag({ pUser }: ISidebarTagProps) {
    const { t } = useTranslation()

    const tags = useMemo(() => {
        return pUser?.hashTags?.length ? pUser?.hashTags : []
    }, [pUser])

    return (
        <Box>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Typography component="h3" variant="subtitle1" fontWeight={700}>
                    {t('main_home.follow_tags')}
                </Typography>
                <Link to={'/dashboard/tags'}>
                    <IconButton
                        sx={{
                            padding: 0.5,
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
                    marginTop: 0.5,
                }}
            >
                {tags.map((tag) => (
                    <Box
                        component="li"
                        key={tag.id}
                        title={tag.name as string}
                        sx={{
                            padding: theme.spacing(1, 2),
                            borderRadius: theme.spacing(0.75),
                            cursor: 'pointer',
                            color: alpha(theme.palette.secondary.main, 0.9),

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
                        {/* WRITE LINK HERE */}
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
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(SidebarTag)
