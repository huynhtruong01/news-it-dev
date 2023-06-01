import { IComment } from '@/models'
import { Box } from '@mui/material'
import { useMemo } from 'react'
import { CommentItem } from '.'
import { TFunction } from 'i18next'

export interface ICommentListProps {
    comments: IComment[]
    t: TFunction<'translation', undefined, 'translation'>
}

export function CommentList({ comments, t }: ICommentListProps) {
    const newCommentList = useMemo(() => {
        return comments.length ? comments : []
    }, [comments])

    return (
        <Box>
            {newCommentList.map((comment) => (
                <CommentItem key={comment.id} comment={comment} t={t} />
            ))}
        </Box>
    )
}
