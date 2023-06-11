import { IHashTag } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Stack } from '@mui/material'
import { CSSProperties, useMemo } from 'react'
import { HashTagItem } from '@/components/Common/HashTagList/components'

export interface IHashTagListProps extends BoxProps {
    tags: IHashTag[]
    fontText?: CSSProperties | string
}

export function HashTagList({
    tags,
    fontText = theme.typography.body2,
    ...rest
}: IHashTagListProps) {
    const newTags = useMemo(() => {
        return tags.length ? tags : []
    }, [tags])

    return (
        <Box
            component="nav"
            margin={'-8px'}
            marginBottom={newTags.length > 0 ? theme.spacing(1.5) : 0}
            {...rest}
        >
            <Stack component="ul" direction={'row'} gap={0.5} flexWrap={'wrap'}>
                {newTags.map((tag) => (
                    <HashTagItem key={tag.id} tag={tag} fontText={fontText} />
                ))}
            </Stack>
        </Box>
    )
}
