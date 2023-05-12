import { AVATAR } from '@/data'
import { theme } from '@/utils'
import { Avatar, Box, Button, Stack, TextField, BoxProps } from '@mui/material'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

export interface ICommentInputProps extends BoxProps {
    onCommentChange: ((value: string) => Promise<void>) | ((value: string) => void)
    isReply?: boolean
    setIsReply?: Dispatch<SetStateAction<boolean>>
}

export function CommentInput({
    onCommentChange,
    isReply = false,
    setIsReply,
    ...rest
}: ICommentInputProps) {
    const [value, setValue] = useState<string>('')

    const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!value) return
        onCommentChange(value)

        setValue('')
    }

    const handleCancelReply = () => {
        console.log('click')
        if (setIsReply) {
            setIsReply(false)
        }
    }

    return (
        <Box {...rest}>
            <Stack direction={'row'} gap={2}>
                <Box>
                    <Avatar
                        src={AVATAR}
                        sx={{
                            width: 32,
                            height: 32,
                        }}
                    />
                </Box>
                <Box component="form" onSubmit={handleCommentSubmit} flex={1}>
                    <Box marginBottom={2}>
                        <TextField
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
                                padding: theme.spacing(1, 2),
                                borderRadius: theme.spacing(0.75),
                                fontWeight: 500,
                                fontSize: '1rem',
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
                                backgroundColor: theme.palette.grey[500],
                                '&:hover': {
                                    backgroundColor: theme.palette.grey[700],
                                },
                            }}
                            onClick={() => setValue('')}
                        >
                            Clear
                        </Button>
                        {isReply && (
                            <Button
                                type="button"
                                variant="contained"
                                sx={{
                                    backgroundColor: theme.palette.grey[500],
                                    '&:hover': {
                                        backgroundColor: theme.palette.grey[700],
                                    },
                                }}
                                onClick={handleCancelReply}
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
