import { IUser } from '@/models'
import { formatDate, theme } from '@/utils'
import { Avatar, Box, BoxProps, Button, Paper, Stack, Typography } from '@mui/material'

export interface INewsSideRightUserProps extends BoxProps {
    user: IUser | null
}

export function NewsSideRightUser({ user, ...rest }: INewsSideRightUserProps) {
    return (
        user && (
            <Box
                {...rest}
                component={Paper}
                elevation={1}
                width={'100%'}
                padding={theme.spacing(0, 2, 2)}
                borderTop={`2rem solid ${theme.palette.primary.main}`}
                borderRadius={theme.spacing(0.75)}
            >
                <Box marginBottom={4}>
                    <Stack
                        direction={'row'}
                        alignItems={'flex-end'}
                        gap={1}
                        sx={{
                            transform: 'translateY(-40%)',
                        }}
                    >
                        <Box>
                            <Avatar
                                src={user.avatar}
                                alt={user.username}
                                sx={{
                                    width: 48,
                                    height: 48,
                                }}
                            />
                        </Box>
                        <Typography component="span" fontSize={'20px'} fontWeight={700}>
                            {user.username}
                        </Typography>
                    </Stack>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: theme.palette.primary.light,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        }}
                    >
                        Follow
                    </Button>
                </Box>

                <Box
                    component="ul"
                    sx={{
                        li: {
                            marginBottom: 2,
                            div: {
                                textTransform: 'uppercase',
                                fontSize: theme.typography.caption,
                                fontWeight: 700,
                            },
                        },
                    }}
                >
                    <Box component="li">
                        <Box>Skill Languages</Box>
                        <Typography>{user.skillLanguages}</Typography>
                    </Box>
                    <Box component="li">
                        <Box>Work</Box>
                        <Typography>{user.work}</Typography>
                    </Box>
                    <Box component="li">
                        <Box>Date Joined</Box>
                        <Typography>
                            {formatDate(user.dateJoined || new Date(), 'MMM DD, YYYY')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        )
    )
}
