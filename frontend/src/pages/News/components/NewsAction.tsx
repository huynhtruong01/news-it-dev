import { IComment, INews } from '@/models'
import {
    ButtonMore,
    ButtonNewsComments,
    ButtonNewsLike,
} from '@/pages/News/components/NewsSideLeft/components'
import { AppState } from '@/store'
import { theme } from '@/utils'
import { Box, Stack } from '@mui/material'
import * as React from 'react'
import { connect } from 'react-redux'

export interface INewsActionProps {
    news: INews
    pComment: IComment[]
}

export function NewsAction({ news, pComment }: INewsActionProps) {
    const commentLength = React.useMemo(() => {
        if (pComment.length) {
            return pComment.reduce((quantities, c) => {
                if (c.childrenComments?.length)
                    return c.childrenComments?.length + quantities + 1
                return quantities + 1
            }, 0)
        }
        return 0
    }, [pComment])

    return (
        <Box
            component="aside"
            width={'100%'}
            sx={{
                padding: theme.spacing(0, 1.5),
                marginBottom: 3,
                display: {
                    md: 'none',
                    xs: 'block',
                },
            }}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                gap={0.75}
                sx={{
                    '& button': {
                        fontSize: {
                            xs: theme.typography.body2,
                        },
                    },
                }}
            >
                <ButtonNewsLike news={news} />
                <ButtonNewsComments totalComments={commentLength} />
                <ButtonMore news={news} />
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pComment: state.comment.comments,
    }
}

export default connect(mapStateToProps, null)(NewsAction)
