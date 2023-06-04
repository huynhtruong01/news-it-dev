import { AppDispatch, AppState } from '@/store'
import { getAllHashTagsPopular } from '@/store/hashTag/thunkApi'
import { Grid, Box } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { ArticleContainer, Sidebar } from '..'
import { getProfile } from '@/store/user/thunkApi'
import { getNotifies } from '@/store/notify/thunkApi'
import { IUser } from '@/models'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/Common'

export interface IMainContentProps {
    pUser: IUser | null
    pGetAllTagsPopular: () => Promise<PayloadAction<unknown>>
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pGetNotifies: (userId: number) => Promise<PayloadAction<unknown>>
}

function MainContent({
    pUser,
    pGetAllTagsPopular,
    pGetProfile,
    pGetNotifies,
}: IMainContentProps) {
    const { t } = useTranslation()

    useEffect(() => {
        ;(async () => {
            try {
                await pGetAllTagsPopular()

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
            />
            <Grid container spacing={2}>
                <Grid
                    item
                    sx={{
                        width: '240px',
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
