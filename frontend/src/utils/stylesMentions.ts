import { alpha } from '@mui/material'
import { theme } from '.'

export const defaultInputStyle = {
    minHeight: 150,
    control: {
        backgroundColor: '#fff',
        fontSize: 16,
    },

    '&multiLine': {
        control: {
            fontFamily: 'monospace',
        },
        highlighter: {
            padding: 9,
            border: '1px solid transparent',
        },
        input: {
            padding: 9,
            border: '1px solid silver',
            borderRadius: theme.spacing(0.75),
        },
    },

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            padding: 1,
            border: '2px inset transparent',
        },
        input: {
            padding: 1,
            border: '2px inset',
        },
    },

    suggestions: {
        list: {
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 16,
        },
        item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
        },
    },
}

export const defaultInput = {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
}
