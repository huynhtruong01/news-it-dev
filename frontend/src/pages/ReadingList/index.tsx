import { IFilters, IHashTag, IUser } from '@/models'
import {
    ReadingListFilters,
    ReadingListNews,
    ReadingListTags,
} from '@/pages/ReadingList/components'
import { AppDispatch, AppState } from '@/store'
import { getProfile } from '@/store/user/thunkApi'
import { removeDuplicated } from '@/utils'
import { Box, Stack, Typography } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'

export interface IReadingListProps {
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
}

function ReadingList({ pUser, pGetProfile }: IReadingListProps) {
    const [filters, setFilters] = useState<IFilters>({
        page: 1,
        limit: 10,
    })

    useEffect(() => {
        document.title = 'Reading list - DEV Community'
        pGetProfile()
    }, [])

    const numSaves = useMemo(() => {
        return pUser?.saves?.length || 0
    }, [pUser])

    const newsSaves = useMemo(() => {
        return pUser?.saves?.length ? pUser.saves : []
    }, [pUser])

    const hashTags = useMemo(() => {
        const hashTagSaves =
            pUser?.saves?.reduce((tags: IHashTag[], news) => {
                return [...tags, ...(news.hashTags || [])]
            }, []) || []

        return removeDuplicated<IHashTag>(hashTagSaves as IHashTag[]) || []
    }, [])

    return (
        <Box>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={3}
            >
                <Typography component="h1" variant="h4" fontWeight={700}>
                    Reading list ({numSaves})
                </Typography>
                <ReadingListFilters setFilters={setFilters} />
            </Stack>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '240px 1fr',
                    gap: 2,
                }}
            >
                <ReadingListTags
                    hashTags={hashTags as IHashTag[]}
                    setFilters={setFilters}
                />
                <ReadingListNews news={newsSaves} />
            </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReadingList)
