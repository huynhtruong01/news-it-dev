import { IComment } from '@/models'
import { Box } from '@mui/material'
import { useMemo } from 'react'
import { CommentItem } from '.'

export interface ICommentListProps {
    comments: IComment[]
}

export function CommentList({ comments }: ICommentListProps) {
    const newCommentList = useMemo(() => {
        return comments.length ? comments : []
    }, [comments])

    return (
        <Box>
            {newCommentList.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </Box>
    )
}
