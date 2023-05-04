import { Box, Typography, Paper } from '@mui/material'
import { SignupForm } from '../../components/Auth'
import { ISignupValues } from '../../models'

export function Signup() {
    const handleSignup = async (values: ISignupValues) => {
        try {
            console.log(values)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box
            sx={{
                backgroundColor: '#eee',
                minHeight: '100vh',
                paddingTop: 6,
            }}
        >
            <Paper
                sx={{
                    maxWidth: 500,
                    margin: 'auto',
                    padding: 2.5,
                    borderRadius: 1.5,
                }}
            >
                <Typography
                    component="h3"
                    variant="h5"
                    textAlign="center"
                    fontWeight={600}
                >
                    Signup
                </Typography>

                <SignupForm onSignupSubmit={handleSignup} />
            </Paper>
        </Box>
    )
}
