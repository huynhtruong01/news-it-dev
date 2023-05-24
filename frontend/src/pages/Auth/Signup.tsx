import { authApi } from '@/api'
import { AuthContainer } from '@/pages/Auth/AuthContainer'
import { SignupForm } from '@components/forms/index'
import { ISignupValues } from '@models/index'
import { Box, Typography } from '@mui/material'
import { theme } from '@utils/index'
import { enqueueSnackbar } from 'notistack'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import { IUser } from '@/models'
import { useEffect } from 'react'

export interface ISignupProps {
    pUser: IUser | null
}

export function Signup({ pUser }: ISignupProps) {
    const navigate = useNavigate()

    useEffect(() => {
        if (pUser) navigate(-1)
    }, [pUser, navigate])

    const handleSignupSubmit = async (values: ISignupValues) => {
        try {
            await authApi.signup(values)

            enqueueSnackbar('Sign up successfully. Check your email.', {
                variant: 'success',
            })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    return (
        <AuthContainer>
            <>
                <Box>
                    <SignupForm onSignupSubmit={handleSignupSubmit} />
                    <Typography
                        sx={{
                            fontSize: '14px',
                            color: theme.palette.secondary.main,
                            margin: theme.spacing(2, 0),
                            textAlign: 'center',

                            a: {
                                color: theme.palette.primary.main,

                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            },
                        }}
                    >
                        Already have an account? <Link to={'/login'}>Login</Link>
                    </Typography>
                </Box>
            </>
        </AuthContainer>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(Signup)
