import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Modal, Paper, Stack, Typography, alpha } from '@mui/material'
import { red } from '@mui/material/colors'
import { connect } from 'react-redux'
import { authApi } from '../../api'
import { AppDispatch, AppState } from '../../store'
import { showModalLogout } from '../../store/common'
import { saveUserLogin } from '../../store/user'
import { removeLS, theme } from '../../utils'
import { useToast } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export interface IModalLogoutProps {
    pIsShowModalLogout: boolean
    pSaveUserLogin: () => void
    pShowModalLogout: (isShow: boolean) => void
}

function ModalLogout({
    pIsShowModalLogout,
    pSaveUserLogin,
    pShowModalLogout,
}: IModalLogoutProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const { toastSuccess, toastError } = useToast()

    const handleClose = () => {
        pShowModalLogout(false)
    }

    const handleLogout = async () => {
        try {
            setLoading(true)
            removeLS(import.meta.env.VITE_ACCESS_TOKEN_KEY)
            removeLS(import.meta.env.VITE_ACCESS_TOKEN_KEY)

            await authApi.logout()
            pSaveUserLogin()
            navigate('/login')
            handleClose()

            toastSuccess('Logout successfully.')
        } catch (error) {
            toastError((error as Error).message)
        }
        setLoading(true)
    }

    return (
        <Modal
            open={!!pIsShowModalLogout}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                padding: 1,
            }}
        >
            <Box
                component={Paper}
                elevation={1}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                        md: 400,
                        xs: '95%',
                    },
                    padding: {
                        md: 3,
                        xs: 2,
                    },
                }}
            >
                <Stack direction={'row'} justifyContent={'center'} marginBottom={2}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            padding: 1,
                            borderRadius: '50%',
                            backgroundColor: red[50],
                            color: red[500],
                        }}
                    >
                        <DeleteIcon fontSize="large" />
                    </Box>
                </Stack>

                <Typography
                    variant="h6"
                    component="h2"
                    fontWeight={700}
                    marginBottom={1.5}
                    sx={{
                        padding: {
                            md: theme.spacing(0, 4),
                            xs: theme.spacing(0, 1),
                        },
                        textAlign: 'center',
                        lineHeight: 1.5,
                        color: theme.palette.secondary.dark,
                    }}
                >
                    Are you sure want to logout?
                </Typography>

                <Stack
                    direction="row"
                    gap={1}
                    justifyContent="center"
                    sx={{
                        button: {
                            padding: 1.5,
                            fontWeight: 500,
                        },
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            color: theme.palette.secondary.main,
                            border: `1px solid ${alpha(
                                theme.palette.secondary.main,
                                0.3
                            )}`,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            },
                        }}
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    {loading ? (
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            disabled={loading}
                            sx={{
                                flex: 1,
                                backgroundColor: red[500],
                                color: theme.palette.primary.contrastText,
                                border: '1px solid transparent',
                                '&:hover': {
                                    backgroundColor: red[700],
                                },
                            }}
                            onClick={handleLogout}
                        >
                            Delete
                        </LoadingButton>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{
                                flex: 1,
                                backgroundColor: red[500],
                                color: theme.palette.primary.contrastText,
                                border: '1px solid transparent',
                                '&:hover': {
                                    backgroundColor: red[700],
                                },
                            }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    )}
                </Stack>
            </Box>
        </Modal>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pIsShowModalLogout: state.common.isShowModalLogout,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSaveUserLogin: () => dispatch(saveUserLogin(null)),
        pShowModalLogout: (isShow: boolean) => dispatch(showModalLogout(isShow)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogout)
