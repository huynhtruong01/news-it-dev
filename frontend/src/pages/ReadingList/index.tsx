import { Seo, TitleContainerPage, TitlePage } from '@/components/Common'
import { IFiltersNewsSave, IHashTag, IUser } from '@/models'
import {
    ReadingListFilters,
    ReadingListNews,
    ReadingListTags,
} from '@/pages/ReadingList/components'
import { AppDispatch, AppState } from '@/store'
import { IProfileFilters, getProfileFilters } from '@/store/user/thunkApi'
import { removeDuplicated } from '@/utils'
import { Box, Grid } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export interface IReadingListProps {
    pUser: IUser | null
    pUserProfileFilter: IUser | null
    pGetProfile: (data: IProfileFilters) => Promise<PayloadAction<unknown>>
}

function ReadingList({ pUser, pUserProfileFilter, pGetProfile }: IReadingListProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(true)
    const [filters, setFilters] = useState<IFiltersNewsSave>({
        search: '',
    })

    useEffect(() => {
        if (!pUser?.id) {
            navigate('/login')
            return
        }

        ;(async () => {
            try {
                setLoading(true)
                if (pUser?.id) {
                    const data: IProfileFilters = {
                        id: pUser?.id,
                        filters,
                    }
                    await pGetProfile(data)
                }
            } catch (error) {
                throw new Error(error as string)
            }

            setLoading(false)
        })()
    }, [filters])

    const numSaves = useMemo(() => {
        return pUserProfileFilter?.saves?.length || 0
    }, [pUserProfileFilter])

    const newsSaves = useMemo(() => {
        return pUserProfileFilter?.saves?.length ? pUserProfileFilter.saves : []
    }, [pUserProfileFilter])

    const hashTags = useMemo(() => {
        if (pUser) {
            const hashTagSaves =
                pUser?.saves?.reduce((tags: IHashTag[], news) => {
                    return [...tags, ...(news.hashTags || [])]
                }, []) || []

            return removeDuplicated<IHashTag>(hashTagSaves as IHashTag[]) || []
        }
    }, [pUser])

    return (
        <Box>
            <Seo
                title={`${t('title_document.reading_list')} - ${t(
                    'title_document.news_community'
                )}`}
            />
            <TitleContainerPage marginBottom={2}>
                <TitlePage>
                    {t('dashboard.reading_list')} ({numSaves})
                </TitlePage>
                <ReadingListFilters setFilters={setFilters} />
            </TitleContainerPage>

            <Grid container spacing={2}>
                <Grid
                    item
                    sx={{
                        width: {
                            md: 240,
                            xs: '100%',
                        },
                    }}
                >
                    <ReadingListTags
                        hashTags={hashTags as IHashTag[]}
                        setFilters={setFilters}
                    />
                </Grid>
                <Grid item xs={12} md>
                    <ReadingListNews news={newsSaves} loading={loading} />
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pUserProfileFilter: state.user.userProfileFilter,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetProfile: (data: IProfileFilters) => dispatch(getProfileFilters(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadingList)
