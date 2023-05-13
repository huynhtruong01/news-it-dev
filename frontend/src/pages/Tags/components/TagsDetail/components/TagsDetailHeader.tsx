import { IHashTag } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Button, Paper, Stack, Typography, alpha } from '@mui/material'

export interface ITagsDetailHeaderProps extends BoxProps {
    tag: IHashTag
}

export function TagsDetailHeader({ tag, ...rest }: ITagsDetailHeaderProps) {
    return (
        <Box
            component="header"
            borderTop={`1rem solid ${tag.color}`}
            borderRadius={theme.spacing(0.75)}
            {...rest}
        >
            <Box component={Paper} elevation={1}>
                <Stack padding={3}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography component="h1" variant="h4" fontWeight={700}>
                            {tag.name}
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'transparent',
                                border: `2px solid ${theme.palette.grey[500]}`,
                                borderRadius: theme.spacing(0.75),
                                color: theme.palette.secondary.main,
                                padding: theme.spacing(0.75, 1.75),
                                fontSize: theme.typography.body1,
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.grey[700], 0.05),
                                    borderColor: theme.palette.grey[700],
                                },
                            }}
                        >
                            Following
                        </Button>
                    </Stack>

                    <Typography marginTop={3}>{tag.description}</Typography>
                </Stack>
            </Box>
        </Box>
    )
}
