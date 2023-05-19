import { IComment } from '@/models'
import { AppDispatch } from '@/store'
import { setComment } from '@/store/comment'
import { setShowModalDeleteComment } from '@/store/common'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
    Box,
    BoxProps,
    IconButton,
    MenuItem,
    Paper,
    Popper,
    PopperPlacementType,
} from '@mui/material'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { connect } from 'react-redux'

export interface ICommentActionProps extends BoxProps {
    comment: IComment
    setEdit?: Dispatch<SetStateAction<IComment | null>>
    setInitValue?: Dispatch<SetStateAction<string>>
    pSetModalDeleteComment: (isShow: boolean) => void
    pSetComment: (comment: IComment) => void
}

const placeholder: PopperPlacementType = 'bottom-start'

function CommentAction({
    comment,
    setEdit,
    setInitValue,
    pSetModalDeleteComment,
    pSetComment,
}: ICommentActionProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        if ((comment.childrenComments?.length as number) > 0) return

        setAnchorEl((prev) => {
            if (!prev) return e.currentTarget
            return null
        })
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDelete = () => {
        // try {
        //     handleClose()
        //     await commentApi.deleteComment(comment.id)
        //     enqueueSnackbar('Delete comment successfully.', {
        //         variant: 'success',
        //     })
        // } catch (error) {
        //     throw new Error(error as string)
        // }
        pSetModalDeleteComment(true)
        pSetComment(comment)
        handleClose()
    }

    const handleUpdate = () => {
        setEdit?.(comment)
        setInitValue?.(comment.comment)
        handleClose()
    }

    return (
        <Box>
            <IconButton
                aria-describedby={'111'}
                sx={{
                    padding: 0.5,
                }}
                onClick={handleOpen}
            >
                <MoreHorizIcon />
            </IconButton>

            <Popper id={'111'} anchorEl={anchorEl} open={open} placeholder={placeholder}>
                <Box component={Paper}>
                    <MenuItem onClick={handleUpdate}>Update</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Box>
            </Popper>
        </Box>
    )
}

const mapDispatchProps = (dispatch: AppDispatch) => {
    return {
        pSetModalDeleteComment: (isShow: boolean) =>
            dispatch(setShowModalDeleteComment(isShow)),
        pSetComment: (comment: IComment) => dispatch(setComment(comment)),
    }
}

export default connect(null, mapDispatchProps)(CommentAction)
