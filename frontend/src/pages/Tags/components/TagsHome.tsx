import { Order } from '@/enums'
import { IFilters, IHashTag } from '@/models'
import { TagsFilters, TagsList } from '@/pages/Tags/components'
import { AppDispatch, AppState } from '@/store'
import { getHashTags } from '@/store/hashTag/thunkApi'
import { Box, Stack, Typography, Skeleton } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface ITagsProps {
    pTags: IHashTag[]
    pGetAllTags: (params: IFilters) => Promise<PayloadAction<unknown>>
}

function TagsHome({ pTags, pGetAllTags }: ITagsProps) {
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(true)
    const [filters, setFilters] = useState<IFilters>({
        limit: 100,
        page: 1,
        createdAt: Order.ASC,
    })

    useEffect(() => {
        document.title = `${t('title_document.tags')} - ${t(
            'title_document.news_community'
        )}`
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
                direction={{
                    md: 'row',
                    xs: 'column',
                }}
                justifyContent={{
                    md: 'space-between',
                    xs: 'flex-start',
                }}
                alignItems={{
                    md: 'center',
                    xs: 'flex-start',
                }}
                marginBottom={2}
                gap={1}
            >
                {loading ? (
                    <Skeleton variant="rounded" width={130} height={38} />
                ) : (
                    <Typography component="h1" variant="h4" fontWeight={700}>
                        {t('tags.title')}
                    </Typography>
                )}
                {loading ? (
                    <Skeleton variant="rounded" width={250} height={38} />
                ) : (
                    <TagsFilters filters={filters} setFilters={setFilters} />
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
