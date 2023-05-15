import { AppDispatch } from '@/store'
import { signout } from '@/store/user'
import { theme } from '@/utils'
import { Button, Stack, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

export interface ISignoutProps {
    pSignout: () => void
}

function Signout({ pSignout }: ISignoutProps) {
    const navigate = useNavigate()
    const handleSignout = () => {
        pSignout()
        enqueueSnackbar('Sign out successfully.', {
            variant: 'success',
        })
        navigate('/')
    }

    return (
        <Stack
            direction={'row'}
            minWidth={'inherit'}
            minHeight={'calc(100vh - 96px)'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Stack justifyContent={'center'} alignItems={'center'}>
                <Typography
                    component="h1"
                    variant="h5"
                    fontWeight={700}
                    sx={{
                        marginBottom: 2,
                    }}
                >
                    Are you sure you want to sign out?
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        padding: theme.spacing(1.5, 2.5),
                        borderRadius: theme.spacing(0.75),
                        backgroundColor: theme.palette.primary.light,
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                    onClick={handleSignout}
                >
                    Yes, sign out
                </Button>
            </Stack>
        </Stack>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSignout: () => dispatch(signout()),
    }
}

export default connect(null, mapDispatchToProps)(Signout)
