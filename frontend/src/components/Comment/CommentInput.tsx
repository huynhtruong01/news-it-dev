import { IComment, IUser } from '@/models'
import { AppState } from '@/store'
import { theme } from '@/utils'
import {
    Avatar,
    Box,
    BoxProps,
    Button,
    Stack,
    TextField,
    useMediaQuery,
} from '@mui/material'
import { TFunction } from 'i18next'
import {
    Dispatch,
    FormEvent,
    MutableRefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react'
import { connect } from 'react-redux'

export interface ICommentInputProps extends BoxProps {
    pUser: IUser | null
    initValue: string
    commentInputRef?: MutableRefObject<HTMLInputElement | null>
    onCommentChange: ((value: string) => Promise<void>) | ((value: string) => void)
    isReply?: boolean
    isEdit?: boolean
    setIsReply?: Dispatch<SetStateAction<boolean>>
    setEdit?: Dispatch<SetStateAction<IComment | null>>
    t: TFunction<'translation', undefined, 'translation'>
}

function CommentInput({
    pUser,
    commentInputRef,
    initValue,
    onCommentChange,
    isReply = false,
    isEdit = false,
    setIsReply,
    setEdit,
    t,
    ...rest
}: ICommentInputProps) {
    const isSmallScreen = useMediaQuery('(min-width:320px)')
    const inputRef = useRef<HTMLElement | null>(null)
    const [value, setValue] = useState<string>(initValue)

    useEffect(() => {
        if (isReply && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isReply])

    const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!value) return
        onCommentChange(value)

        setValue('')
    }

    const handleCancel = () => {
        if (setIsReply) {
            setIsReply(false)
        }

        if (setEdit) {
            setEdit(null)
        }
    }

    return (
        <Box {...rest}>
            <Stack
                direction={'row'}
                gap={{
                    md: 2,
                    xs: 1,
                }}
            >
                {!isEdit && (
                    <Box>
                        <Avatar
                            src={pUser?.avatar as string}
                            sx={{
                                width: {
                                    md: 32,
                                    xs: 24,
                                },
                                height: {
                                    md: 32,
                                    xs: 24,
                                },
                            }}
                        />
                    </Box>
                )}
                <Box component="form" onSubmit={handleCommentSubmit} flex={1}>
                    <Box marginBottom={1.5}>
                        <TextField
                            inputRef={commentInputRef ? commentInputRef : inputRef}
                            value={value}
                            fullWidth
                            onChange={(e) => setValue(e.target.value)}
                            minRows={isSmallScreen ? 3 : 6}
                            multiline
                            placeholder={t('placeholder.add_discussion') as string}
                            sx={{
                                '& fieldset': {
                                    borderRadius: theme.spacing(1),
                                },
                            }}
                        />
                    </Box>
                    <Stack
                        direction="row"
                        gap={1}
                        sx={{
                            button: {
                                color: theme.palette.primary.contrastText,
                                padding: theme.spacing(1.75, 2),
                                borderRadius: theme.spacing(0.75),
                                fontWeight: 500,
                            },
                        }}
                    >
                        <Button
                            type="submit"
                            disabled={!value}
                            variant="contained"
                            sx={{
                                '&.Mui-disabled': {
                                    cursor: 'not-allowed',
                                    backgroundColor: theme.palette.primary.main,
                                    opacity: 0.6,
                                    color: theme.palette.primary.contrastText,
                                },
                            }}
                        >
                            {t('button.submit')}
                        </Button>
                        {/* <Button
                            type="button"
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.grey[700],
                                '&:hover': {
                                    backgroundColor: theme.palette.grey[900],
                                },
                            }}
                            onClick={() => setValue('')}
                        >
                            {t('button.clear')}
                        </Button> */}
                        {(isReply || isEdit) && (
                            <Button
                                type="button"
                                variant="contained"
                                sx={{
                                    backgroundColor: theme.palette.grey[500],
                                    '&:hover': {
                                        backgroundColor: theme.palette.grey[700],
                                    },
                                }}
                                onClick={handleCancel}
                            >
                                {t('button.cancel')}
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(CommentInput)
