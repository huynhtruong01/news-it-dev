import { CommentInput, CommentList } from '@/components'
import { comments } from '@/data'
import { theme } from '@/utils'
import { Box, BoxProps, Typography } from '@mui/material'
import { useMemo } from 'react'

export type INewsCommentProps = BoxProps

export function NewsComment({ ...rest }: INewsCommentProps) {
    const handleCommentSubmit = (value: string) => {
        console.log('comment value: ', value)
    }

    const commentLength = useMemo(() => {
        return comments.length || 0
    }, [comments])

    return (
        <Box {...rest} padding={theme.spacing(4, 8)}>
            <Box component="header" marginBottom={3}>
                <Typography component="h2" variant="h5" fontWeight={700}>
                    Comments ({commentLength})
                </Typography>
            </Box>

            <Box>
                <CommentInput
                    onCommentChange={handleCommentSubmit}
                    sx={{
                        marginBottom: 6,
                    }}
                />
                <CommentList comments={comments} />
            </Box>
        </Box>
    )
}
