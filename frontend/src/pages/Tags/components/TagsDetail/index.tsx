import { hashTagApi } from '@/api'
import { NewsFilters } from '@/enums'
import { IHashTag, INews, INewsStatus, IUser } from '@/models'
import {
    TagsDetailHeader,
    TagsDetailLeft,
    TagsDetailNews,
} from '@/pages/Tags/components/TagsDetail/components'
import { AppState } from '@/store'
import { Box, Stack, Grid } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

export interface ITagsDetailProps {
    pUser: IUser | null
}

function TagsDetail({ pUser }: ITagsDetailProps) {
    const [status, setStatus] = useState<INewsStatus>(NewsFilters.LATEST)
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
        let newTagNews = [...tagNews]
        if (status === NewsFilters.LATEST) {
            newTagNews = newTagNews.sort((a, b) => {
                return (
                    new Date(b.createdAt as Date).getTime() -
                    new Date(a.createdAt as Date).getTime()
                )
            })
            setTagNews(newTagNews)
            return
        }

        newTagNews = newTagNews.sort((a, b) => (b.numLikes || 0) - (a.numLikes || 0))
        setTagNews(newTagNews)
    }, [status])

    return (
        tag && (
            <Box>
                <Stack
                    sx={{
                        width: '100%',
                        gap: 4,
                    }}
                >
                    <TagsDetailHeader tag={tag} />

                    <Grid container spacing={2}>
                        <Grid
                            item
                            sx={{
                                width: '240px',
                            }}
                        >
                            <TagsDetailLeft hashTagFollows={hashTagFollows} />
                        </Grid>

                        <Grid item md>
                            <TagsDetailNews
                                status={status}
                                setStatus={setStatus}
                                news={tagNews}
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
