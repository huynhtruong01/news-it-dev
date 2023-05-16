import { IHashTag } from '@/models'
import { Box } from '@mui/material'
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
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: 3,
                    }}
                >
                    {tags.map((tag) => (
                        <TagsItem key={tag.id} tag={tag} />
                    ))}
                </Box>
            )}
        </Box>
    )
}
