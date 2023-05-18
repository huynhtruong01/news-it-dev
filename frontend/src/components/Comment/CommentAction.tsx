import { commentApi } from '@/api'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
    Box,
    IconButton,
    MenuItem,
    Paper,
    Popper,
    PopperPlacementType,
    BoxProps,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import { enqueueSnackbar } from 'notistack'

export interface ICommentActionProps extends BoxProps {
    commentId: number
}

const placeholder: PopperPlacementType = 'bottom-start'

export function CommentAction({ commentId }: ICommentActionProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDelete = async () => {
        try {
            await commentApi.deleteComment(commentId)
            enqueueSnackbar('Delete comment successfully.', {
                variant: 'success',
            })
        } catch (error) {
            throw new Error(error as string)
        }
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
                    <MenuItem onClick={handleClose}>Update</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Box>
            </Popper>
        </Box>
    )
}
