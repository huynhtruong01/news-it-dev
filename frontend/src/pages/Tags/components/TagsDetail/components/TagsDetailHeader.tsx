import { hashTagApi } from '@/api'
import { getProfile } from '@/store/user/thunkApi'
import { IsFollow } from '@/enums'
import { IFollow, IHashTag, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { theme } from '@/utils'
import { Box, BoxProps, Paper, Stack, Typography, alpha, Button } from '@mui/material'
import { useMemo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import { COLOR_WHITE } from '@/consts'
import { setShowModalAuth } from '@/store/common'

export interface ITagsDetailHeaderProps extends BoxProps {
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    tag: IHashTag
    pSetShowModalAuth: (isShow: boolean) => void
}

function TagsDetailHeader({
    pUser,
    pGetProfile,
    tag,
    pSetShowModalAuth,
    ...rest
}: ITagsDetailHeaderProps) {
    const [followed, setFollowed] = useState<IFollow>(IsFollow.FOLLOW)

    const color = useMemo(() => {
        return tag.color === COLOR_WHITE ? theme.palette.primary.dark : tag.color
    }, [tag])

    useEffect(() => {
        if (Array.isArray(pUser?.hashTags)) {
            const isFollowed = pUser?.hashTags.find((t) => t.id === tag.id)
            if (isFollowed) {
                setFollowed(IsFollow.FOLLOWING)
                return
            }

            setFollowed(IsFollow.FOLLOW)
            return
        }

        setFollowed(IsFollow.FOLLOW)
        return
    }, [pUser])

    const handleFollowClick = async () => {
        try {
            if (!pUser?.id) {
                pSetShowModalAuth(true)
                return
            }

            if (pUser?.id || tag.id) {
                setFollowed(IsFollow.FOLLOWING)
                // call api follow tag
                await hashTagApi.followHashTag(tag.id)
                // get profile
                await pGetProfile()
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    const handleUnfollowClick = async () => {
        try {
            if (!pUser?.id) {
                pSetShowModalAuth(true)
                return
            }

            if (pUser?.id || tag.id) {
                setFollowed(IsFollow.FOLLOW)
                // call api follow tag
                await hashTagApi.unfollowHashTag(tag.id)
                // get profile
                await pGetProfile()
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    const handleShowModal = () => {
        pSetShowModalAuth(true)
    }

    return (
        <Box component="header" borderRadius={theme.spacing(0.75)} {...rest}>
            <Box
                component={Paper}
                elevation={1}
                sx={{
                    borderTop: `1rem solid ${color}`,
                }}
            >
                <Stack padding={3}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography component="h1" variant="h4" fontWeight={700}>
                            {tag.name}
                        </Typography>
                        <Box
                            sx={{
                                button: {
                                    backgroundColor:
                                        followed === IsFollow.FOLLOWING
                                            ? 'transparent'
                                            : theme.palette.primary.light,
                                    border: `2px solid ${
                                        followed === IsFollow.FOLLOWING
                                            ? theme.palette.grey[500]
                                            : theme.palette.primary.light
                                    }`,
                                    borderRadius: theme.spacing(0.75),
                                    color:
                                        followed === IsFollow.FOLLOWING
                                            ? theme.palette.secondary.main
                                            : theme.palette.primary.contrastText,
                                    padding: theme.spacing(0.75, 1.75),
                                    fontSize: theme.typography.body1,
                                    fontWeight: 500,
                                    transition: '.2s ease-in-out',
                                    '&:hover': {
                                        backgroundColor:
                                            followed === IsFollow.FOLLOWING
                                                ? alpha(theme.palette.grey[700], 0.05)
                                                : theme.palette.primary.dark,
                                        borderColor:
                                            followed === IsFollow.FOLLOWING
                                                ? theme.palette.grey[700]
                                                : theme.palette.primary.dark,
                                    },
                                },
                            }}
                        >
                            {!pUser?.id && (
                                <Button variant="contained" onClick={handleShowModal}>
                                    Follow
                                </Button>
                            )}
                            {pUser?.id &&
                                (followed === IsFollow.FOLLOWING ? (
                                    <Button
                                        variant="contained"
                                        onClick={handleUnfollowClick}
                                    >
                                        Following
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={handleFollowClick}
                                    >
                                        Follow
                                    </Button>
                                ))}
                        </Box>
                    </Stack>

                    <Typography marginTop={3}>{tag.description}</Typography>
                </Stack>
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
        pGetProfile: () => dispatch(getProfile()),
        pSetShowModalAuth: (isShow: boolean) => dispatch(setShowModalAuth(isShow)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsDetailHeader)
