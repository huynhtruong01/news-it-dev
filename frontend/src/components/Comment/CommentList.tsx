import { IComment } from '@/models'
import { Stack, StackProps } from '@mui/material'
import { TFunction } from 'i18next'
import { useMemo } from 'react'
import { CommentItem } from '.'

export interface ICommentListProps extends StackProps {
    comments: IComment[]
    t: TFunction<'translation', undefined, 'translation'>
}

export function CommentList({ comments, t, ...rest }: ICommentListProps) {
    const newCommentList = useMemo(() => {
        return comments.length ? comments : []
    }, [comments])

    return (
        <Stack gap={3} {...rest}>
            {newCommentList.map((comment) => (
                <CommentItem key={comment.id} comment={comment} t={t} />
            ))}
        </Stack>
    )
}
