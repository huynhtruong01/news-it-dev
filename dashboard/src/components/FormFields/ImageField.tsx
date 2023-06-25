import { Box, BoxProps, Typography, FormLabel, FormHelperText } from '@mui/material'
import { Controller, FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { theme, generateLinkImg } from '../../utils'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { indigo, red } from '@mui/material/colors'
import { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    dragEnter: {
        opacity: '0.6',
        cursor: 'move',
    },
})

export type IImageFieldProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues, any>
    name: Path<TFormValues>
    label: string
    disabled: boolean
    initValue: string | undefined
    placeholder?: string
    width?: number | string
    height?: number
} & BoxProps

export function ImageField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    disabled,
    initValue,
    width = 200,
    height = 100,
    ...rest
}: IImageFieldProps<TFormValues>) {
    const styles = useStyles()
    const imgInputRef = useRef<HTMLLabelElement | null>(null)
    const [img, setImg] = useState<string | undefined>(initValue)
    const {
        control,
        formState: { errors },
        setValue,
        trigger,
        watch,
    } = form
    const error = errors[name]

    useEffect(() => {
        setImg(initValue)
    }, [initValue, watch])

    const handleDragEnter = () => {
        if (imgInputRef.current) {
            imgInputRef.current.classList.add(styles.dragEnter)
        }
    }

    const handleDragLeave = () => {
        if (imgInputRef.current) {
            imgInputRef.current.classList.remove(styles.dragEnter)
        }
    }

    const handleDrop = () => {
        if (imgInputRef.current) {
            imgInputRef.current.classList.remove(styles.dragEnter)
        }
    }

    const handleCancel = () => {
        setValue(name, undefined as PathValue<TFormValues, Path<TFormValues>>)
        setImg(undefined)

        trigger(name)
        trigger(
            name === ('thumbnailImage' as Path<TFormValues>)
                ? ('coverImage' as Path<TFormValues>)
                : ('thumbnailImage' as Path<TFormValues>)
        )
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange } }) => (
                <Box
                    sx={{
                        margin: theme.spacing(2, 0, 4),
                    }}
                    {...rest}
                >
                    {!img && (
                        <Box>
                            <FormLabel
                                error={!!error?.message}
                                sx={{
                                    display: 'inline-flex',
                                    marginBottom: theme.spacing(0.5),
                                    fontSize: '14px',
                                }}
                            >
                                {label}
                            </FormLabel>
                            <Box
                                ref={imgInputRef}
                                component="label"
                                htmlFor={name}
                                display="inline-flex"
                                sx={{
                                    width: '100%',
                                    minHeight: 70,
                                    border: `2px dashed ${
                                        error?.message ? red[500] : indigo[500]
                                    }`,
                                    cursor: 'pointer',
                                    borderRadius: theme.spacing(0.5),
                                    padding: theme.spacing(4, 2),
                                    backgroundColor: error?.message
                                        ? red[50]
                                        : indigo[50],
                                }}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            svg: {
                                                fontSize: '50px',
                                                color: error?.message
                                                    ? red[500]
                                                    : indigo[500],
                                            },
                                        }}
                                    >
                                        <CloudUploadIcon />
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            color: error?.message
                                                ? red[500]
                                                : theme.palette.grey['A400'],
                                            maxWidth: '80%',
                                            textAlign: 'center',
                                            fontWeight: 400,
                                        }}
                                    >
                                        Drag & Drop or Choose your file here.
                                    </Typography>
                                </Box>
                            </Box>
                            <FormHelperText
                                error={!!error?.message}
                                sx={{
                                    margin: theme.spacing(0.5, 1.75, 0),
                                }}
                            >
                                {(error?.message as string) || ''}
                            </FormHelperText>
                            <input
                                type="file"
                                id={name}
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        const url = generateLinkImg(e.target.files?.[0])
                                        onChange(e.target.files[0])
                                        setImg(url)
                                    }
                                }}
                                hidden
                            />
                        </Box>
                    )}

                    {img && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    width,
                                    height,
                                    img: {
                                        height: '100%',
                                        borderRadius: theme.spacing(0.75),
                                    },
                                }}
                            >
                                <img src={img} alt={label} />
                            </Box>
                            <Box>
                                <Box
                                    display={disabled ? 'none' : 'inline-flex'}
                                    onClick={handleCancel}
                                    sx={{
                                        cursor: 'pointer',
                                        padding: theme.spacing(0.75, 1.75),
                                        borderRadius: theme.spacing(0.75),
                                        border: `2px solid ${theme.palette.grey[500]}`,
                                        color: theme.palette.grey[700],
                                        fontWeight: 500,
                                        transition: '.2s ease-in-out',

                                        '&:hover': {
                                            backgroundColor: theme.palette.grey[100],
                                        },
                                    }}
                                >
                                    Cancel
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            )}
        />
    )
}
