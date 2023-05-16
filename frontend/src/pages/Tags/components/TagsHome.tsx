import { Order } from '@/enums'
import { IFilters, IHashTag } from '@/models'
import { TagsFilters, TagsList } from '@/pages/Tags/components'
import { AppDispatch, AppState } from '@/store'
import { getHashTags } from '@/store/hashTag/thunkApi'
import { Box, Stack, Typography, Skeleton } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

export interface ITagsProps {
    pTags: IHashTag[]
    pGetAllTags: (params: IFilters) => Promise<PayloadAction<unknown>>
}

function TagsHome({ pTags, pGetAllTags }: ITagsProps) {
    const [loading, setLoading] = useState<boolean>(true)
    const [filters, setFilters] = useState<IFilters>({
        limit: 100,
        page: 1,
        createdAt: Order.ASC,
    })

    useEffect(() => {
        document.title = 'Tags - DEV Community'
    }, [])

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                await pGetAllTags(filters)
            } catch (error) {
                throw new Error(error as string)
            }
            setLoading(false)
        })()
    }, [filters])

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={3}
            >
                {loading ? (
                    <Skeleton variant="rounded" width={130} height={38} />
                ) : (
                    <Typography component="h1" variant="h4" fontWeight={700}>
                        Top Tags
                    </Typography>
                )}
                {loading ? (
                    <Skeleton variant="rounded" width={250} height={38} />
                ) : (
                    <Box>
                        <TagsFilters filters={filters} setFilters={setFilters} />
                    </Box>
                )}
            </Stack>

            <Box>
                <TagsList tags={pTags} loading={loading} />
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pTags: state.hashTag.hashTags,
        total: state.hashTag.total,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetAllTags: (params: IFilters) => dispatch(getHashTags(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsHome)
