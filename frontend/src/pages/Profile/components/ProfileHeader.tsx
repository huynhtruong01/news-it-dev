import { IsFollow } from '@/enums'
import { IFollow, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { formatDate, theme } from '@/utils'
import { Avatar, Box, Button, Divider, Paper, Typography, alpha } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export interface IProfileHeaderProps {
    pUser: IUser | null
    pSetShowModalAuth: (isShow: boolean) => void
    user: IUser
    isFollow?: boolean
    followed?: IFollow
    onFollow?: () => Promise<void>
}

export function ProfileHeader({
    pUser,
    pSetShowModalAuth,
    user,
    isFollow = false,
    followed,
    onFollow,
}: IProfileHeaderProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const handleShowModalAuth = () => {
        pSetShowModalAuth(true)
    }

    return (
        <Box component="header">
            <Box component={Paper} elevation={1}>
                <Box
                    sx={{
                        position: 'relative',
                        paddingTop: 2,
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-64px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        <Avatar
                            src={user.avatar}
                            alt={user.username}
                            sx={{
                                width: 128,
                                height: 128,
                                border: `8px solid ${theme.palette.primary.dark}`,
                            }}
                        />
                    </Box>
                    {isFollow ? (
                        <>
                            {!pUser?.id && (
                                <Button
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                        borderRadius: theme.spacing(0.75),
                                        padding: theme.spacing(1, 2),
                                        backgroundColor: theme.palette.primary.light,
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.dark,
                                        },
                                    }}
                                    onClick={handleShowModalAuth}
                                >
                                    {t('profile.follow')}
                                </Button>
                            )}
                            {pUser?.id && (
                                <Button
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                        padding: theme.spacing(1.5, 2),
                                        backgroundColor:
                                            followed === IsFollow.FOLLOW
                                                ? theme.palette.primary.light
                                                : alpha(
                                                      theme.palette.secondary.dark,
                                                      0.05
                                                  ),
                                        fontWeight: 500,
                                        lineHeight: 1,
                                        borderRadius: theme.spacing(0.75),
                                        color:
                                            followed === IsFollow.FOLLOW
                                                ? theme.palette.primary.contrastText
                                                : theme.palette.secondary.dark,
                                        boxShadow: `0 0 1px ${
                                            followed === IsFollow.FOLLOW
                                                ? 'transparent'
                                                : theme.palette.secondary.main
                                        }`,

                                        '&:hover': {
                                            backgroundColor:
                                                followed === IsFollow.FOLLOW
                                                    ? theme.palette.primary.dark
                                                    : alpha(
                                                          theme.palette.secondary.dark,
                                                          0.1
                                                      ),
                                        },
                                    }}
                                    onClick={onFollow}
                                >
                                    {followed === IsFollow.FOLLOWING
                                        ? t('profile.following')
                                        : t('profile.follow')}
                                </Button>
                            )}
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                borderRadius: theme.spacing(0.75),
                                padding: theme.spacing(1.5, 2),
                                backgroundColor: theme.palette.primary.light,
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                            onClick={() => navigate('/settings/profile')}
                        >
                            {t('button.edit_profile')}
                        </Button>
                    )}
                </Box>
                <Box padding={theme.spacing(8, 3, 3)} textAlign="center">
                    <Typography
                        component="h1"
                        variant="h4"
                        fontWeight={800}
                        marginBottom={1}
                    >
                        {user.username}
                    </Typography>
                    {user.bio && (
                        <Typography
                            fontSize={'18px'}
                            sx={{
                                width: '100%',
                                maxWidth: '80%',
                                margin: 'auto',
                                marginBottom: 2,
                            }}
                        >
                            {user.bio}
                        </Typography>
                    )}
                    <Typography
                        sx={{
                            fontSize: theme.typography.body2,
                            color: alpha(theme.palette.secondary.dark, 0.7),
                        }}
                    >
                        {t('dates.joined_on')}{' '}
                        {formatDate(user.dateJoined || new Date(), 'MMM DD, YYYY')}
                    </Typography>
                </Box>
                {user.work && (
                    <>
                        <Divider />
                        <Box padding={1.5} textAlign="center">
                            <Box padding={1.5}>
                                <Box
                                    component="strong"
                                    sx={{
                                        fontSize: theme.typography.body2,
                                        fontWeight: 700,
                                    }}
                                >
                                    {t('input.work')}
                                </Box>
                                <Typography>{user.work}</Typography>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowModalAuth: (isShow: boolean) => dispatch(setShowModalAuth(isShow)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader)
