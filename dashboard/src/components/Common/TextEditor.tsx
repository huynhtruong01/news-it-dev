import { Box } from '@mui/material'
import { useCallback, useEffect, useRef } from 'react'
import { Noop } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toolbarOptions } from '../../data'
import { uploadImage, theme } from '../../utils'
import { makeStyles } from '@mui/styles'

export interface ITextEditorProps {
    value: string
    onChange: (...event: any[]) => void
    onBlur: Noop
    disabled: boolean
    placeholder?: string
}

const modules = {
    toolbar: toolbarOptions,
}

const useStyles = makeStyles({
    root: {
        '& .ql-container': {
            borderRadius: theme.spacing(0, 0, 0.5, 0.5),
        },
        '& .ql-editor': {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#333',
            minHeight: 200,

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
})

export function TextEditor({
    value,
    onChange,
    onBlur,
    disabled,
    placeholder = '',
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

                const photo = await uploadImage(file)

                const quill = quillRef.current
                const range = quill?.getEditor().getSelection()?.index

                if (range !== undefined && photo?.url) {
                    quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
                }
            } catch (error) {
                throw new Error(error as string)
            }
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
                className={styles.root}
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
