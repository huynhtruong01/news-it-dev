import { hashTagApi } from '@/api'
import { IHashTag } from '@/models'
import {
    TagsDetailHeader,
    TagsDetailNews,
} from '@/pages/Tags/components/TagsDetail/components'
import { Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function TagsDetail() {
    const params = useParams()
    const [tag, setTag] = useState<IHashTag | null>(null)

    useEffect(() => {
        if (params.slug) {
            ;(async () => {
                try {
                    const res = await hashTagApi.getHashTag(params.slug as string)
                    setTag(res.data.hashTag)
                } catch (error) {
                    throw new Error(error as string)
                }
            })()
        }
    }, [params])

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

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '280px 1fr 280px',
                            gap: 2,
                        }}
                    >
                        {/* TODO: MAKE LEFT TAG HERE */}
                        <Box>Left tag</Box>

                        <TagsDetailNews news={tag.news} />

                        {/* TODO: MAKE RIGHT TAG HERE */}
                        <Box>Right tag</Box>
                    </Box>
                </Stack>
            </Box>
        )
    )
}
