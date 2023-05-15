import { theme } from '@/utils'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
    Box,
    BoxProps,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Typography,
    alpha,
} from '@mui/material'
import { green } from '@mui/material/colors'
import { MouseEvent, useState } from 'react'

export type IButtonMoreProps = BoxProps

export function ButtonMore({ ...rest }: IButtonMoreProps) {
    const [copied, setCopied] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleOpenMore = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleCloseMore = () => {
        setAnchorEl(null)
        setCopied(false)
    }

    const handleCopyLink = async () => {
        const link = window.location.href
        setCopied(true)

        await navigator.clipboard.writeText(link)
    }

    return (
        <Box {...rest}>
            <IconButton
                onClick={handleOpenMore}
                sx={{
                    borderRadius: '50%',
                }}
            >
                <MoreHorizIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMore}
                disableScrollLock={true}
                PaperProps={{
                    elevation: 1,
                    sx: {
                        padding: 1,
                        borderRadius: theme.spacing(0.75),
                        width: 250,
                        overflow: 'visible',
                        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
                        marginLeft: '45px',
                        marginTop: '-40px',
                        ul: {
                            padding: 0,
                        },
                        li: {
                            borderRadius: theme.spacing(0.75),
                            padding: 1,
                            marginBottom: 0.5,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                <MenuItem
                    onClick={handleCopyLink}
                    sx={{
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            'span, svg': {
                                color: theme.palette.primary.dark,
                            },
                        },
                    }}
                >
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        width={'100%'}
                        sx={{
                            'span, svg': {
                                color: theme.palette.secondary.main,
                            },
                            svg: {
                                margin: theme.spacing(0, 1),
                            },
                        }}
                    >
                        <Typography component="span" fontWeight={700}>
                            Copy link
                        </Typography>
                        <FileCopyIcon />
                    </Stack>
                </MenuItem>
                {copied && (
                    <MenuItem
                        sx={{
                            cursor: 'text',
                            backgroundColor: alpha(green[500], 0.1),
                            '&:hover': {
                                backgroundColor: alpha(green[500], 0.1),
                            },
                        }}
                    >
                        <Typography textAlign={'center'} width={'100%'}>
                            Copied to Clipboard
                        </Typography>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    )
}
