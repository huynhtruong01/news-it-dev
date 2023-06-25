import { AppState } from '@/store'
import { theme } from '@/utils'
import { Box, BoxProps } from '@mui/material'
import 'highlight.js/styles/github.css'
import { useEffect, useRef, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { connect } from 'react-redux'
import { ModalImageNews } from '.'

export interface INewsContentProps extends BoxProps {
    content: string
    pLanguage: string
}

export function NewsContent({ content, ...rest }: INewsContentProps) {
    const containerRef = useRef<HTMLElement | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [srcImg, setSrcImg] = useState<string>('')

    useEffect(() => {
        const handleClick = (event) => {
            const clickedElement = event.target

            if (clickedElement.tagName === 'IMG') {
                const imgSrc = clickedElement.getAttribute('src')
                setSrcImg(imgSrc)
                setOpen(true)
            }
        }

        const containerElement = containerRef.current
        containerElement?.addEventListener('click', handleClick)

        return () => {
            containerElement?.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <>
            <Box
                component="article"
                className="ql-snow"
                padding={{
                    lg: theme.spacing(4, 8),
                    xs: theme.spacing(0, 0, 2),
                }}
                {...rest}
            >
                <Box
                    ref={containerRef}
                    className="ql-editor"
                    sx={{
                        padding: {
                            lg: 0,
                            xs: 2,
                        },
                        letterSpacing: '0.5px',
                        lineHeight: '1.7 !important',
                        fontSize: {
                            sm: '18px',
                            xs: '1rem',
                        },
                        color: '#171717',
                        overflowWrap: 'break-word',
                        '& > p': {
                            letterSpacing: '0.5px',
                            lineHeight: '1.7 !important',
                            fontSize: {
                                sm: '18px',
                                xs: '1rem',
                            },
                            color: '#171717',
                            overflowWrap: 'break-word',
                            margin: {
                                lg: theme.spacing(0, 0, 2.5, 0),
                                md: theme.spacing(0, 0, 1, 0),
                                xs: 0,
                            },
                        },
                        span: {
                            lineHeight: '30px !important',
                        },
                        img: {
                            width: '100%',
                            height: 'auto',
                            borderRadius: theme.spacing(0.75),
                            margin: 'auto',
                            cursor: 'zoom-in',
                        },
                        'h1,h2,h3,h4,h5,h6': {
                            margin: {
                                md: theme.spacing(1.25, 0),
                                xs: theme.spacing(1, 0),
                            },
                        },
                        '& pre': {
                            '&.ql-syntax': {
                                whiteSpace: 'pre',
                                borderRadius: theme.spacing(0.75),
                                padding: 3,
                                overflow: 'auto !important',
                            },
                            fontSize: {
                                sm: '1rem',
                                xs: theme.typography.body2,
                            },
                        },
                    }}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </Box>

            <ModalImageNews
                srcImg={srcImg}
                open={open}
                setOpen={setOpen}
                setSrcImg={setSrcImg}
            />
        </>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pLanguage: state.common.languages,
    }
}

export default connect(mapStateToProps, null)(NewsContent)
