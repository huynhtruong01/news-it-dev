import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { theme } from '../../utils'
import { red } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'

export interface IModalDeleteProps {
    title: string
    message: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    onDelete: () => Promise<void>
}

export function ModalDelete({
    title,
    message,
    open,
    setOpen,
    onDelete,
}: IModalDeleteProps) {
    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = async () => {
        try {
            await onDelete()
            setOpen(false)
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{
                        backgroundColor: theme.palette.grey[500],
                        '&:hover': {
                            backgroundColor: theme.palette.grey[700],
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleDelete}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    sx={{
                        backgroundColor: red[500],
                        '&:hover': {
                            backgroundColor: red[700],
                        },
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
