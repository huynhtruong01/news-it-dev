import { SkeletonProfile } from '@/components/Common'
import { IUser } from '@/models'
import {
    ProfileHeader,
    ProfileInfo,
    ProfileLeftItem,
    ProfileNews,
} from '@/pages/Profile/components'
import { ProfileUserNumFollow } from '@/pages/ProfileUser/components'
import { AppDispatch, AppState } from '@/store'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import { Box, Grid, Stack } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface IProfileProps {
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
}

function Profile({ pUser, pGetProfile }: IProfileProps) {
    const { t } = useTranslation()

    useEffect(() => {
        document.title = `${pUser?.username} - DEV Community`
        pGetProfile()
    }, [])

    const newNews = useMemo(() => {
        return pUser?.news?.length ? pUser.news : []
    }, [pUser])

    return pUser ? (
        <Box>
            <Box
                sx={{
                    width: '100%',
                    height: 150,
                    backgroundColor: theme.palette.primary.dark,
                }}
            ></Box>

            <Stack
                gap={2}
                sx={{
                    width: '100%',
                    maxWidth: '1024px',
                    margin: 'auto',
                    marginTop: '-4rem',
                }}
            >
                <ProfileHeader user={pUser as IUser} />

                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <Stack gap={2}>
                            <ProfileUserNumFollow
                                numFollowed={pUser.numFollowers as number}
                                numFollowing={pUser.numFollowing as number}
                                linkFollowed={'/dashboard/followers'}
                                linkFollowing={`/dashboard/following`}
                            />

                            {pUser.skillLanguages && (
                                <ProfileLeftItem
                                    title={t('input.skill_languages')}
                                    value={pUser.skillLanguages}
                                />
                            )}

                            {pUser.currentlyLearning && (
                                <ProfileLeftItem
                                    title={t('input.currently_learning')}
                                    value={pUser.currentlyLearning}
                                />
                            )}

                            <ProfileInfo
                                numNews={pUser.newsCount as number}
                                numComments={(pUser.comments?.length || 0) as number}
                                numTag={pUser.hashTags?.length as number}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md={8}>
                        <ProfileNews news={newNews} />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    ) : (
        <Box>
            <SkeletonProfile />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetProfile: () => dispatch(getProfile()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
