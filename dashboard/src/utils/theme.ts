import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { red } from '@mui/material/colors'

let theme = createTheme({
    palette: {
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: 'md',
            },
            styleOverrides: {
                maxWidthSm: {
                    maxWidth: '680px',
                    '@media (min-width: 600px)': {
                        maxWidth: '680px',
                    },
                },
                maxWidthMd: {
                    maxWidth: '860px',
                    '@media (min-width: 900px)': {
                        maxWidth: '860px',
                    },
                },
            },
        },
        MuiButton: {
            defaultProps: {},
            variants: [
                {
                    props: {
                        variant: 'contained',
                        color: 'primary',
                    },
                    style: {
                        color: '#fff',
                        textTransform: 'capitalize',
                        padding: '8px',
                    },
                },
            ],
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    paddingInline: 4,
                },
            },
            variants: [
                {
                    props: {
                        color: 'secondary',
                    },
                    style: {
                        backgroundColor: '#142850',
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                },
            ],
        },
    },
})

theme = responsiveFontSizes(theme)

export { theme }
// theme.typography.h3 = {
//     fontSize: '2rem',
//     [theme.breakpoints.up('md')]: {
//         fontSize: '44px'
//     }
// }