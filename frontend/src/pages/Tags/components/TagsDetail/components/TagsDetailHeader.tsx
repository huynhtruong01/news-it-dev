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

export interface ITagsDetailHeaderProps extends BoxProps {
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    tag: IHashTag
}

function TagsDetailHeader({ pUser, pGetProfile, tag, ...rest }: ITagsDetailHeaderProps) {
    const [followed, setFollowed] = useState<IFollow>(IsFollow.FOLLOW)

    const color = useMemo(() => {
        return tag.color === '#ffffff' ? theme.palette.primary.dark : tag.color
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
            if (pUser?.id || tag.id) {
                // call api follow tag
                await hashTagApi.followHashTag(tag.id)
                // get profile
                await pGetProfile()
                setFollowed(IsFollow.FOLLOWING)
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    const handleUnfollowClick = async () => {
        try {
            if (pUser?.id || tag.id) {
                // call api follow tag
                await hashTagApi.unfollowHashTag(tag.id)
                // get profile
                await pGetProfile()
                setFollowed(IsFollow.FOLLOW)
            }
        } catch (error) {
            throw new Error(error as string)
        }
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
                                    backgroundColor: 'transparent',
                                    border: `2px solid ${theme.palette.grey[500]}`,
                                    borderRadius: theme.spacing(0.75),
                                    color: theme.palette.secondary.main,
                                    padding: theme.spacing(0.75, 1.75),
                                    fontSize: theme.typography.body1,
                                    fontWeight: 500,
                                    '&:hover': {
                                        backgroundColor: alpha(
                                            theme.palette.grey[700],
                                            0.05
                                        ),
                                        borderColor: theme.palette.grey[700],
                                    },
                                },
                            }}
                        >
                            {followed === IsFollow.FOLLOWING ? (
                                <Button variant="contained" onClick={handleUnfollowClick}>
                                    Following
                                </Button>
                            ) : (
                                <Button variant="contained" onClick={handleFollowClick}>
                                    Follow
                                </Button>
                            )}
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsDetailHeader)
