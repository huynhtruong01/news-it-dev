import { Seo, TitleContainerPage, TitlePage } from '@/components/Common'
import { Order } from '@/enums'
import { IFilters, IHashTag } from '@/models'
import { TagsFilters, TagsList } from '@/pages/Tags/components'
import { AppDispatch, AppState } from '@/store'
import { getHashTags } from '@/store/hashTag/thunkApi'
import { Box, Skeleton } from '@mui/material'
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
            <Seo
                title={`${t('title_document.tags')} - ${t(
                    'title_document.news_community'
                )}`}
            />
            <TitleContainerPage marginBottom={2}>
                {loading ? (
                    <Skeleton variant="rounded" width={130} height={38} />
                ) : (
                    <TitlePage>{t('tags.title')}</TitlePage>
                )}
                {loading ? (
                    <Skeleton variant="rounded" width={250} height={38} />
                ) : (
                    <TagsFilters filters={filters} setFilters={setFilters} />
                )}
            </TitleContainerPage>

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
