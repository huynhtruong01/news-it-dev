import { IComment, IUser } from '@/models'
import { AppState } from '@/store'
import { theme } from '@/utils'
import { Avatar, Box, BoxProps, Button, Stack, TextField } from '@mui/material'
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
    ...rest
}: ICommentInputProps) {
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
            <Stack direction={'row'} gap={2}>
                {!isEdit && (
                    <Box>
                        <Avatar
                            src={pUser?.avatar}
                            sx={{
                                width: 32,
                                height: 32,
                            }}
                        />
                    </Box>
                )}
                <Box component="form" onSubmit={handleCommentSubmit} flex={1}>
                    <Box marginBottom={2}>
                        <TextField
                            inputRef={commentInputRef ? commentInputRef : inputRef}
                            value={value}
                            fullWidth
                            onChange={(e) => setValue(e.target.value)}
                            minRows={6}
                            multiline
                            placeholder="Add to the discussion"
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
                                padding: theme.spacing(1.25, 2),
                                borderRadius: theme.spacing(0.75),
                                fontWeight: 500,
                                fontSize: theme.typography.body2,
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
                            Submit
                        </Button>
                        <Button
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
                            Clear
                        </Button>
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
                                Cancel
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
