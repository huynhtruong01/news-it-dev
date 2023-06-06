import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { red } from '@mui/material/colors'

let theme = createTheme({
    palette: {
        primary: {
            main: '#2f3ab2',
            light: '#3b49df',
            dark: '#2f3ab2',
            contrastText: '#ffffff',
        },
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
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: '0 0 1px 1px rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                },
            },
        },
    },
})

theme = responsiveFontSizes(theme)

export { theme }
