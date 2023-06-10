import { IHashTag } from '@/models'
import { Box, Grid } from '@mui/material'
import { TagsItem } from '.'
import { EmptyList, SkeletonHashTagList } from '@/components/Common'
import { useTranslation } from 'react-i18next'

export interface ITagsListProps {
    loading: boolean
    tags: IHashTag[]
}

export function TagsList({ tags, loading }: ITagsListProps) {
    const { t } = useTranslation()

    return (
        <Box>
            {!loading && tags.length === 0 && <EmptyList title={t('empty.no_tags')} />}
            {loading && <SkeletonHashTagList />}
            {!loading && (
                <Grid container spacing={2}>
                    {tags.map((tag) => (
                        <Grid key={tag.id} item xs={12} sm={6} md={4}>
                            <TagsItem tag={tag} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    )
}
