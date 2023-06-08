import { alpha } from '@mui/material'
import { theme } from '.'

export const defaultInputStyle = {
    control: {
        backgroundColor: '#fff',
        fontSize: 14,
        fontWeight: 'normal',
    },

    '&multiLine': {
        control: {
            fontFamily: 'Roboto, sans-serif',
            minHeight: 150,
        },
        highlighter: {
            padding: theme.spacing(1),
            border: '1px solid transparent',
        },
        input: {
            padding: theme.spacing(1),
            borderRadius: theme.spacing(0.75),
            fontSize: '1rem',
            top: '1px',
        },
    },

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            padding: 1,
        },
        input: {
            padding: theme.spacing(0.25, 0.5),
            borderRadius: theme.spacing(0.75),
            color: theme.palette.primary.dark,
            fontSize: '1rem',
            top: '1px',
        },
    },

    suggestions: {
        list: {
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 14,
            borderRadius: theme.spacing(0.75),
        },
        item: {
            padding: theme.spacing(0.25, 0.5),
            '&focused': {
                backgroundColor: alpha(theme.palette.primary.dark, 0.125),
                color: theme.palette.primary.dark,
            },
            borderRadius: theme.spacing(0.75),
            color: theme.palette.primary.dark,
        },
    },
}

export const defaultInput = {
    backgroundColor: alpha(theme.palette.primary.dark, 0.15),
    borderRadius: theme.spacing(0.75),
    fontSize: '1rem',
}
