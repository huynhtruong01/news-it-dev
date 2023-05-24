import { IHashTag } from '@/models'
import { Box, Grid } from '@mui/material'
import { TagsItem } from '.'
import { SkeletonHashTagList } from '@/components/Common'

export interface ITagsListProps {
    loading: boolean
    tags: IHashTag[]
}

export function TagsList({ tags, loading }: ITagsListProps) {
    return (
        <Box>
            {loading && <SkeletonHashTagList />}
            {!loading && (
                <Grid container spacing={3}>
                    {tags.map((tag) => (
                        <Grid key={tag.id} item md={4}>
                            <TagsItem tag={tag} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    )
}
