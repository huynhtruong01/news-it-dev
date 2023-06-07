import { IComment, INews } from '@/models'
import {
    ButtonMore,
    ButtonNewsComments,
    ButtonNewsLike,
    ButtonNewsSave,
} from '@/pages/News/components/NewsSideLeft/components'
import { AppState } from '@/store'
import { Box, BoxProps, Stack } from '@mui/material'
import { useMemo } from 'react'
import { connect } from 'react-redux'

export interface INewsSideLeftProps extends BoxProps {
    news: INews
    pComment: IComment[]
}

function NewsSideLeft({ news, pComment }: INewsSideLeftProps) {
    const commentLength = useMemo(() => {
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
        <Box component="aside" position={'relative'} height={'100%'}>
            <Stack alignItems={'center'} gap={2} position={'sticky'} top={120}>
                <ButtonNewsLike news={news} />
                <ButtonNewsComments totalComments={commentLength} />
                <ButtonNewsSave news={news} />
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

export default connect(mapStateToProps, null)(NewsSideLeft)
