import { generateLinkImg, theme } from '@/utils'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
    Box,
    BoxProps,
    FormHelperText,
    InputLabel,
    Stack,
    Typography,
} from '@mui/material'
import { indigo, red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import { useEffect, useRef, useState } from 'react'
import { Controller, FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
    dragEnter: {
        opacity: '0.6',
        cursor: 'move',
    },
})

export type IImageLargeFieldProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues, any>
    name: Path<TFormValues>
    label: string
    disabled: boolean
    initValue: string | undefined
    placeholder?: string
    required?: boolean
} & BoxProps

export function ImageLargeField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    disabled,
    initValue,
    required = false,
    ...rest
}: IImageLargeFieldProps<TFormValues>) {
    const { t } = useTranslation()
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
            render={({ field: { onChange, ref } }) => (
                <Box
                    sx={{
                        margin: theme.spacing(2, 0, 4),
                    }}
                    {...rest}
                >
                    <InputLabel
                        error={!!error?.message}
                        required={required}
                        sx={{
                            fontWeight: 500,
                            color: '#000',
                            '.MuiFormLabel-asterisk': {
                                color: red[500],
                            },
                        }}
                    >
                        {label}
                    </InputLabel>
                    {!img && (
                        <Box>
                            <Box
                                ref={imgInputRef}
                                component="label"
                                htmlFor={name}
                                display="inline-flex"
                                sx={{
                                    marginTop: 1,
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
                                        {t('placeholder.drag_drop')}
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
                                ref={ref}
                                type="file"
                                id={name}
                                accept={'.png, .jpg, .jpeg'}
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        const url = generateLinkImg(e.target.files?.[0])
                                        setValue(
                                            name,
                                            e.target.files?.[0] as PathValue<
                                                TFormValues,
                                                Path<TFormValues>
                                            >
                                        )
                                        trigger(name)
                                        onChange(e.target.files[0])
                                        setImg(url)
                                    }
                                }}
                                hidden
                            />
                        </Box>
                    )}

                    {img && (
                        <Stack gap={1}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 153,
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
                                    {t('button.cancel')}
                                </Box>
                            </Box>
                        </Stack>
                    )}
                </Box>
            )}
        />
    )
}
