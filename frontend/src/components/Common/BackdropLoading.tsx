import { AppState } from '@/store'
import { Backdrop, CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { connect } from 'react-redux'

export interface IBackdropLoadingProps {
    pLoading: boolean
}

export function BackdropLoading({ pLoading }: IBackdropLoadingProps) {
    useEffect(() => {
        if (pLoading) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [pLoading])

    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                overflow: 'hidden',
            }}
            open={pLoading}
        >
            <CircularProgress color="primary" />
        </Backdrop>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pLoading: state.common.loadingCommon,
    }
}

export default connect(mapStateToProps, null)(BackdropLoading)
