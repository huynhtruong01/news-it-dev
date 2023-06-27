import { Seo } from '@/components/Common'
import { IMAGE_PREVIEW } from '@/consts'
import { IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { getAllHashTagsPopular } from '@/store/hashTag/thunkApi'
import { getNotifies } from '@/store/notify/thunkApi'
import { getProfile } from '@/store/user/thunkApi'
import { Box, Grid } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { ArticleContainer, Sidebar, UserSidebar } from '..'

export interface IMainContentProps {
    pUser: IUser | null
    pGetAllTagsPopular: () => Promise<PayloadAction<unknown>>
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pGetNotifies: (userId: number) => Promise<PayloadAction<unknown>>
}

function MainContent({ pUser, pGetProfile, pGetNotifies }: IMainContentProps) {
    const { t } = useTranslation()

    useEffect(() => {
        ;(async () => {
            try {
                if (pUser?.id) {
                    await pGetProfile()
                    await pGetNotifies(pUser?.id as number)
                }
            } catch (error) {
                throw new Error(error as string)
            }
        })()
    }, [])

    return (
        <Box>
            <Seo
                title={`${t('title_document.home')} - ${t(
                    'title_document.news_community'
                )}`}
                url={window.location.href}
                image={IMAGE_PREVIEW}
            />
            <Grid container spacing={2}>
                <Grid
                    item
                    sx={{
                        width: 240,
                        display: {
                            xs: 'none',
                            md: 'block',
                        },
                    }}
                >
                    <Sidebar />
                </Grid>

                <Grid item xs={12} md>
                    <ArticleContainer />
                </Grid>

                <Grid
                    item
                    md={3.1}
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'block',
                        },
                    }}
                >
                    <UserSidebar user={pUser as IUser} />
                </Grid>
            </Grid>
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
        pGetAllTagsPopular: () => dispatch(getAllHashTagsPopular()),
        pGetProfile: () => dispatch(getProfile()),
        pGetNotifies: (userId: number) =>
            dispatch(getNotifies({ filters: { page: 1, limit: 100 }, userId })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent)
