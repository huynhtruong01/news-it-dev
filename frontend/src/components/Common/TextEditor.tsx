import { toolbarOptions } from '@/data'
import { AppDispatch } from '@/store'
import { setLoadingCommon } from '@/store/common'
import { theme, uploadImage } from '@/utils'
import { Box } from '@mui/material'
import { red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { useCallback, useEffect, useRef } from 'react'
import { Noop } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { connect } from 'react-redux'

export interface ITextEditorProps {
    value: string
    onChange: (...event: any[]) => void
    onBlur: Noop
    disabled: boolean
    placeholder?: string
    error?: boolean
    pSetLoading: (isLoading: boolean) => void
}

const modules = {
    syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
    },
    toolbar: toolbarOptions,
}

const useStyles = makeStyles({
    root: {
        '& .ql-container.ql-snow': {
            '& .ql-tooltip.ql-editing': {
                left: '15px !important',
            },
        },
        '& .ql-container': {
            borderRadius: theme.spacing(0, 0, 0.5, 0.5),
            overflow: 'hidden',
        },
        '& .ql-editor': {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#333',
            minHeight: 200,
            backgroundColor: '#fff',

            '&[data-placeholder]::before': {
                fontStyle: 'normal',
                fontWeight: 300,
                color: theme.palette.grey[400],
                padding: theme.spacing(1, 0),
            },

            '& span': {
                lineHeight: 2,
            },
            '& p': {
                margin: theme.spacing(1, 0),
            },
            '& img': {
                borderRadius: theme.spacing(0.5),
                margin: theme.spacing(1.5, 0),
                width: 'auto',
                height: 'auto',
            },
            '& h1,h2,h3,h4,h5,h6': {
                margin: theme.spacing(1.25, 0),
            },
        },
        '& .ql-toolbar': {
            backgroundColor: '#fff',
            borderRadius: theme.spacing(0.5, 0.5, 0, 0),
            borderBottom: '1px solid #ccc',
            padding: '8px',
        },
        '& .ql-toolbar button': {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            color: '#333',
        },
    },
    error: {
        '& .ql-container': {
            borderRadius: theme.spacing(0, 0, 0.5, 0.5),
            overflow: 'hidden',
            borderColor: red[500],
        },
        '& .ql-editor': {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#333',
            minHeight: 200,
            backgroundColor: '#fff',

            '&[data-placeholder]::before': {
                fontStyle: 'normal',
            },

            '& span': {
                lineHeight: 2,
            },
            '& p': {
                margin: theme.spacing(1, 0),
            },
            '& img': {
                borderRadius: theme.spacing(0.5),
                margin: theme.spacing(1.5, 0),
                width: 'auto',
                height: 'auto',
            },
            '& h1,h2,h3,h4,h5,h6': {
                margin: theme.spacing(1.25, 0),
            },
        },
        '& .ql-toolbar': {
            backgroundColor: '#fff',
            borderRadius: theme.spacing(0.5, 0.5, 0, 0),
            borderBottom: `1px solid ${red[500]}`,
            padding: '8px',
            borderColor: red[500],
        },
        '& .ql-toolbar button': {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            color: '#333',
        },

        '& .ql-toolbar.ql-snow': {
            '& .ql-stroke, & .ql-fill, & .ql-thin': {
                stroke: red[500],
                '&:hover': {
                    stroke: red[500],
                },
            },
            '& .ql-picker-label': {
                color: red[500],
            },
        },
    },
})

function TextEditor({
    value,
    onChange,
    onBlur,
    disabled,
    placeholder = '',
    error,
    pSetLoading,
}: ITextEditorProps) {
    const styles = useStyles()
    const quillRef = useRef<ReactQuill | null>(null)

    const handleImageChange = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.click()

        input.onchange = async () => {
            try {
                const files = input.files

                if (!files) return
                const file = files[0]
                pSetLoading(true)
                const photo = await uploadImage(file)

                const quill = quillRef.current
                const range = quill?.getEditor().getSelection()?.index

                if (range !== undefined && photo?.url) {
                    quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
                    pSetLoading(false)
                }
            } catch (error) {
                throw new Error(error as string)
            }
            pSetLoading(false)
        }
    }, [value])

    useEffect(() => {
        const quill = quillRef.current
        if (!quill) return

        const toolbar = quill.getEditor().getModule('toolbar')
        toolbar.addHandler('image', handleImageChange)
    }, [handleImageChange])

    return (
        <Box
            sx={{
                img: {
                    objectFit: 'none',
                    width: 'auto',
                    height: 'auto',
                },
            }}
        >
            <ReactQuill
                ref={quillRef}
                className={error ? styles.error : styles.root}
                value={value}
                theme={'snow'}
                onChange={onChange}
                onBlur={onBlur}
                modules={modules}
                readOnly={disabled}
                placeholder={placeholder}
            />
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetLoading: (isLoading: boolean) => dispatch(setLoadingCommon(isLoading)),
    }
}

export default connect(null, mapDispatchToProps)(TextEditor)
