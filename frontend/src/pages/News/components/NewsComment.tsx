import { CommentInput, CommentList } from '@/components'
import { comments } from '@/data'
import { theme } from '@/utils'
import { Box, BoxProps, Typography } from '@mui/material'
import { useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export type INewsCommentProps = BoxProps

export function NewsComment({ ...rest }: INewsCommentProps) {
    const commentInputRef = useRef<HTMLInputElement | null>(null)
    const commentRef = useRef<HTMLDivElement | null>(null)

    const location = useLocation()

    useEffect(() => {
        if (commentRef.current && location.hash === '#comments') {
            commentRef.current.scrollIntoView({ behavior: 'smooth' })
            if (commentInputRef.current) {
                commentInputRef.current.focus()
            }
        }
    }, [])

    const handleCommentSubmit = (value: string) => {
        console.log('comment value: ', value)
    }

    const commentLength = useMemo(() => {
        return comments.length || 0
    }, [comments])

    return (
        <Box {...rest} ref={commentRef} id="comments" padding={theme.spacing(4, 8)}>
            <Box component="header" marginBottom={3}>
                <Typography component="h2" variant="h5" fontWeight={700}>
                    Comments ({commentLength})
                </Typography>
            </Box>

            <Box>
                <CommentInput
                    commentInputRef={commentInputRef}
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
