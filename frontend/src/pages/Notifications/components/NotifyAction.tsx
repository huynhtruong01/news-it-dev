import { INotify } from '@/models'
import { Box, BoxProps, IconButton, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useState } from 'react'
import { connect } from 'react-redux'
import { AppDispatch } from '@/store'
import { deleteNotify } from '@/store/notify'
import { enqueueSnackbar } from 'notistack'
import { notifyApi } from '@/api'
import { theme } from '@/utils'
import { useTranslation } from 'react-i18next'

export interface INotifyActionProps extends BoxProps {
    notify: INotify
    pDeleteNotify: (data: INotify) => void
}

function NotifyAction({ notify, pDeleteNotify, ...rest }: INotifyActionProps) {
    const { t } = useTranslation()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDeleteNotify = async () => {
        try {
            pDeleteNotify(notify)
            handleClose()
            await notifyApi.deleteNotify(notify.id)
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    return (
        <Box {...rest}>
            <IconButton
                sx={{
                    padding: theme.spacing(0, 0.5),
                }}
                onClick={handleClick}
            >
                <MoreHorizIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 1,
                }}
            >
                <MenuItem onClick={handleDeleteNotify}>{t('button.delete')}</MenuItem>
            </Menu>
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pDeleteNotify: (data: INotify) => dispatch(deleteNotify(data)),
    }
}

export default connect(null, mapDispatchToProps)(NotifyAction)
