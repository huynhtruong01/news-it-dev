import { SignupForm } from '@components/forms/index'
import { ISignupValues } from '@models/index'
import { Box, Typography } from '@mui/material'
import { theme } from '@utils/index'
import { authApi } from '@/api'
import { useToast } from '@hooks/index'
import { Link } from 'react-router-dom'
import { AuthContainer } from '@/pages/Auth/AuthContainer'
import { useNavigate } from 'react-router-dom'

export function Signup() {
    const { toastSuccess } = useToast()
    const navigate = useNavigate()

    const handleSignupSubmit = async (values: ISignupValues) => {
        try {
            await authApi.signup(values)

            toastSuccess('Sign up successfully.')
            navigate('/login')
        } catch (error) {
            throw new Error(error as string)
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
