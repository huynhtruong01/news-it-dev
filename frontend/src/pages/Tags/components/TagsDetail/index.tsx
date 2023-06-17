import { hashTagApi } from '@/api'
import { Seo } from '@/components/Common'
import { NewsFilters } from '@/enums'
import { IHashTag, INews, INewsFilters, IUser } from '@/models'
import {
    TagsDetailHeader,
    TagsDetailLeft,
    TagsDetailNews,
} from '@/pages/Tags/components/TagsDetail/components'
import { AppState } from '@/store'
import { Box, Grid, Stack } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export interface ITagsDetailProps {
    pUser: IUser | null
}

function TagsDetail({ pUser }: ITagsDetailProps) {
    const { t } = useTranslation()
    const [filters, setFilters] = useState<INewsFilters>({
        status: NewsFilters.LATEST,
        search: '',
    })
    // const [status, setStatus] = useState<INewsStatus>(NewsFilters.LATEST)
    const [tag, setTag] = useState<IHashTag | null>(null)
    const [tagNews, setTagNews] = useState<INews[]>([])
    const params = useParams()

    const hashTagFollows = useMemo(() => {
        if (pUser?.hashTags?.length) {
            return pUser.hashTags.filter((t) => t.id !== tag?.id)
        }
        return []
    }, [pUser, tag])

    useEffect(() => {
        if (params.slug) {
            ;(async () => {
                try {
                    const res = await hashTagApi.getHashTag(params.slug as string)
                    setTag(res.data.hashTag)

                    // set news of tag
                    let newTagNews = [...(res.data.hashTag.news || [])]
                    newTagNews = newTagNews.sort((a, b) => {
                        return (
                            new Date(b.createdAt as Date).getTime() -
                            new Date(a.createdAt as Date).getTime()
                        )
                    })
                    setTagNews(newTagNews)
                } catch (error) {
                    throw new Error(error as string)
                }
            })()
        }
    }, [params])

    useEffect(() => {
        if (tag?.news?.length) {
            let newTagNews = [...tag.news]

            // status filters
            if (filters.status === NewsFilters.LATEST) {
                newTagNews = newTagNews.sort((a, b) => {
                    return (
                        new Date(b.createdAt as Date).getTime() -
                        new Date(a.createdAt as Date).getTime()
                    )
                })
            } else {
                newTagNews = newTagNews.sort(
                    (a, b) => (b.numLikes || 0) - (a.numLikes || 0)
                )
            }

            // search filters
            newTagNews = newTagNews.filter((n) => {
                if (filters.search === '') return true
                return (filters.search as string)
                    .toLowerCase()
                    .split(' ')
                    .filter((x) => !!x)
                    .some((w) => n.title.toLowerCase().includes(w))
            })
            setTagNews(newTagNews)
        }
    }, [filters])

    return (
        tag && (
            <Box>
                <Seo title={`${tag.title} - ${t('title_document.news_community')}`} />
                <Stack
                    sx={{
                        width: '100%',
                        gap: 4,
                    }}
                >
                    <TagsDetailHeader tag={tag} />

                    <Grid
                        container
                        spacing={{
                            md: 2,
                            xs: 3,
                        }}
                    >
                        <Grid
                            item
                            sx={{
                                width: {
                                    md: '240px',
                                    xs: '100%',
                                },
                            }}
                        >
                            <TagsDetailLeft tag={tag} hashTagFollows={hashTagFollows} />
                        </Grid>

                        <Grid item xs={12} md>
                            <TagsDetailNews
                                filters={filters}
                                setFilters={setFilters}
                                news={tagNews}
                                sx={{
                                    width: {
                                        md: 'auto',
                                        xs: '100%',
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        )
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(TagsDetail)
