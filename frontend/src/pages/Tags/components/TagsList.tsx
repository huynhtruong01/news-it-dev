import { IHashTag } from '@/models'
import { Box } from '@mui/material'
import { TagsItem } from '.'

export interface ITagsListProps {
    tags: IHashTag[]
}

export function TagsList({ tags }: ITagsListProps) {
    return (
        <Box>
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
        </Box>
    )
}
