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
        secondary: {
            main: '#404040',
            light: '#3d3d3d',
            dark: '#1b1b1b',
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
                    maxWidth: 680,
                    '@media (min-width: 600px)': {
                        maxWidth: 680,
                    },
                },
                maxWidthMd: {
                    maxWidth: 1264,
                    '@media (min-width: 900px)': {
                        maxWidth: 1264,
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
                        lineHeight: 1,
                        color: '#fff',
                        textTransform: 'none',
                        padding: '8px',
                        whiteSpace: 'nowrap',
                        minWidth: 'auto',
                        boxShadow: 'none',
                        fontWeight: 400,
                        fontSize: '16px',
                        '&:hover': {
                            boxShadow: 'none',
                        },
                    },
                },
            ],
        },
        MuiIconButton: {
            variants: [
                {
                    props: {},
                    style: {
                        borderRadius: '6px',
                        svg: {
                            color: '#404040',
                        },
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
        MuiTypography: {
            styleOverrides: {
                h3: {
                    fontSize: '48px',
                    lineHeight: '60px',
                    '@media (min-width: 1200px)': {
                        fontSize: '48px',
                        lineHeight: '60px',
                    },
                },
                h4: {
                    fontSize: '30px',
                    '@media (min-width: 1200px)': {
                        fontSize: '30px',
                    },
                },
                h5: {
                    fontSize: '24px',
                    '@media (min-width: 1200px)': {
                        fontSize: '24px',
                    },
                },
                h6: {
                    fontSize: '20px',
                    '@media (min-width: 1200px)': {
                        fontSize: '20px',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: '0 0 1px 1px rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                },
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                },
            },
        },
    },
})

theme = responsiveFontSizes(theme)

export { theme }
