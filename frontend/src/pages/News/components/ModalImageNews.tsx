import { Fade, Modal } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Dispatch, SetStateAction } from 'react'

export interface IModalImageNewsProps {
    srcImg: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    setSrcImg: Dispatch<SetStateAction<string>>
}

const useStyles = makeStyles({
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            bgColor: 'red',
        },
    },
    imgContainer: {
        outline: 'none',
    },
    img: {
        maxHeight: '80% !important',
        maxWidth: '80% !important',
    },
})

export function ModalImageNews({
    srcImg,
    open,
    setOpen,
    setSrcImg,
}: IModalImageNewsProps) {
    const handleClose = () => {
        setOpen(false)
        setSrcImg('')
    }
    const style = useStyles()

    return (
        <Modal
            className={style.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            sx={{
                '& img': {
                    width: {
                        md: 'auto',
                        xs: '95% !important',
                    },
                    maxWidth: {
                        md: '60%',
                        xs: '95%',
                    },
                    maxHeight: '90%',
                    borderRadius: '6px',
                },
            }}
        >
            <Fade in={open} timeout={500} className={style.imgContainer}>
                <img src={srcImg} alt="" />
            </Fade>
        </Modal>
    )
}
