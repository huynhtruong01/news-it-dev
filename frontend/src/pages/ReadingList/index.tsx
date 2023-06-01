import { IFiltersNewsSave, IHashTag, IUser } from '@/models'
import {
    ReadingListFilters,
    ReadingListNews,
    ReadingListTags,
} from '@/pages/ReadingList/components'
import { AppDispatch, AppState } from '@/store'
import { IProfileFilters, getProfileFilters } from '@/store/user/thunkApi'
import { removeDuplicated } from '@/utils'
import { Box, Stack, Typography, Grid } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface IReadingListProps {
    pUser: IUser | null
    pUserProfileFilter: IUser | null
    pGetProfile: (data: IProfileFilters) => Promise<PayloadAction<unknown>>
}

function ReadingList({ pUser, pUserProfileFilter, pGetProfile }: IReadingListProps) {
    const { t } = useTranslation()
    const [filters, setFilters] = useState<IFiltersNewsSave>({
        search: '',
    })

    useEffect(() => {
        document.title = 'Reading list - DEV Community'
    }, [])

    useEffect(() => {
        if (!pUser?.id) return
        ;(async () => {
            try {
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
        })()
    }, [filters])

    const numSaves = useMemo(() => {
        return pUserProfileFilter?.saves?.length || 0
    }, [pUserProfileFilter])

    const newsSaves = useMemo(() => {
        return pUserProfileFilter?.saves?.length ? pUserProfileFilter.saves : []
    }, [pUserProfileFilter])

    const hashTags = useMemo(() => {
        const hashTagSaves =
            pUser?.saves?.reduce((tags: IHashTag[], news) => {
                return [...tags, ...(news.hashTags || [])]
            }, []) || []

        return removeDuplicated<IHashTag>(hashTagSaves as IHashTag[]) || []
    }, [pUser])

    return (
        <Box>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={3}
            >
                <Typography component="h1" variant="h4" fontWeight={700}>
                    {t('dashboard.reading_list')} ({numSaves})
                </Typography>
                <ReadingListFilters setFilters={setFilters} />
            </Stack>

            <Grid container spacing={2}>
                <Grid
                    item
                    sx={{
                        width: '240px',
                    }}
                >
                    <ReadingListTags
                        hashTags={hashTags as IHashTag[]}
                        setFilters={setFilters}
                    />
                </Grid>
                <Grid item md>
                    <ReadingListNews news={newsSaves} />
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
