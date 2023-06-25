import { COLOR_WHITE } from '@/consts'
import { IComment, IUser } from '@/models'
import { AppState } from '@/store'
import { defaultInput, defaultInputStyle, theme } from '@/utils'
import {
    Avatar,
    Box,
    BoxProps,
    Button,
    CircularProgress,
    Stack,
    alpha,
} from '@mui/material'
import { TFunction } from 'i18next'
import {
    Dispatch,
    FormEvent,
    MutableRefObject,
    SetStateAction,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { DataFunc, Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'
import { connect } from 'react-redux'

export interface ICommentInputProps extends BoxProps {
    initValue: string
    commentInputRef?: MutableRefObject<HTMLInputElement | null>
    onCommentChange: ((value: string) => Promise<void>) | ((value: string) => void)
    isReply?: boolean
    isEdit?: boolean
    setIsReply?: Dispatch<SetStateAction<boolean>>
    setEdit?: Dispatch<SetStateAction<IComment | null>>
    loading?: boolean
    t: TFunction<'translation', undefined, 'translation'>
    pUser: IUser | null
}

function CommentInput({
    initValue,
    onCommentChange,
    commentInputRef,
    isReply = false,
    isEdit = false,
    setIsReply,
    setEdit,
    t,
    pUser,
    loading = false,
    ...rest
}: ICommentInputProps) {
    const inputRef = useRef<HTMLElement | null>(null)
    const [value, setValue] = useState<string>(initValue)

    useEffect(() => {
        if (isReply && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isReply])

    const mentions = useMemo(() => {
        return pUser?.following?.map((u) => ({ id: u.id, display: u.username }))
    }, [pUser])

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
                        <MentionsInput
                            inputRef={commentInputRef}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={t('placeholder.add_discussion') as string}
                            style={defaultInputStyle}
                            a11ySuggestionsListLabel={'Suggested mentions'}
                        >
                            <Mention
                                trigger="@"
                                data={mentions as SuggestionDataItem[] | DataFunc}
                                style={defaultInput}
                            />
                        </MentionsInput>
                    </Box>
                    <Stack
                        direction="row"
                        gap={1}
                        sx={{
                            button: {
                                padding: theme.spacing(1.75, 2),
                                borderRadius: theme.spacing(0.75),
                                fontWeight: 500,
                            },
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!value}
                            startIcon={
                                loading ? (
                                    <CircularProgress
                                        size={16}
                                        sx={{
                                            color: COLOR_WHITE,
                                        }}
                                    />
                                ) : null
                            }
                            sx={{
                                '&.Mui-disabled': {
                                    cursor: 'not-allowed',
                                    backgroundColor: theme.palette.primary.main,
                                    opacity: 0.6,
                                    color: theme.palette.primary.contrastText,
                                },
                                span: {
                                    margin: 0,
                                },
                            }}
                        >
                            {loading ? '' : t('button.submit')}
                        </Button>
                        {(isReply || isEdit) && (
                            <Button
                                type="button"
                                variant="contained"
                                sx={{
                                    backgroundColor: 'transparent',
                                    color: theme.palette.secondary.main,
                                    border: `1px solid ${alpha(
                                        theme.palette.secondary.main,
                                        0.3
                                    )}`,
                                    '&:hover': {
                                        backgroundColor: alpha(
                                            theme.palette.secondary.main,
                                            0.1
                                        ),
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
