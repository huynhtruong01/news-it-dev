import { INotify } from '@/models'
import { AppDispatch } from '@/store'
import { setShowModalDeleteNotify } from '@/store/common'
import { setNotify } from '@/store/notify'
import { theme } from '@/utils'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Box, BoxProps, IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface INotifyActionProps extends BoxProps {
    notify: INotify
    pSetShowModalDeleteNotify: (isShow: boolean) => void
    pSetNotify: (data: INotify | null) => void
}

function NotifyAction({
    notify,
    pSetShowModalDeleteNotify,
    pSetNotify,
    ...rest
}: INotifyActionProps) {
    const { t } = useTranslation()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDeleteNotify = () => {
        if (notify) {
            pSetShowModalDeleteNotify(true)
            pSetNotify(notify)
            handleClose()
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
                sx={{
                    '& ul': {
                        padding: 0,
                    },
                    '& li': {
                        padding: {
                            md: theme.spacing(0.75, 2),
                            xs: theme.spacing(0.75, 1),
                        },
                    },
                }}
            >
                <MenuItem onClick={handleDeleteNotify}>{t('button.delete')}</MenuItem>
            </Menu>
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowModalDeleteNotify: (isShow: boolean) =>
            dispatch(setShowModalDeleteNotify(isShow)),
        pSetNotify: (data: INotify | null) => dispatch(setNotify(data)),
    }
}

export default connect(null, mapDispatchToProps)(NotifyAction)
