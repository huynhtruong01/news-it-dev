import { MAX_SCROLL_TOP } from '@/consts'
import { theme } from '@/utils'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import { Box, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'

// export interface IScrollTopProps {}

export function ScrollTop() {
    const [isShow, setIsShow] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > MAX_SCROLL_TOP) {
                setIsShow(true)
            } else {
                setIsShow(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScrollTop = () => {
        if (isShow) {
            window.scrollTo(0, 0)
            setIsShow(false)
        }
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: {
                    md: 50,
                    xs: 25,
                },
                right: isShow
                    ? {
                          md: 40,
                          xs: 20,
                      }
                    : {
                          md: -40,
                          xs: -20,
                      },
                opacity: isShow ? 1 : 0,
                transition: '.2s ease-in-out',
            }}
        >
            <IconButton
                sx={{
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.contrastText,
                    boxShadow: `0 0 1px ${theme.palette.secondary.main}`,
                }}
                onClick={handleScrollTop}
            >
                <ExpandLessRoundedIcon />
            </IconButton>
        </Box>
    )
}
